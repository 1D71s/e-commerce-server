import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { AppModule } from '../src/app.module';
import { ConfigService } from '@nestjs/config';
import { REFRESH_TOKEN } from 'src/common/variables';
import { DataSource } from 'typeorm';

describe('AdminProducts (e2e)', () => {
    let app: INestApplication;
    let authToken: string;
    let refreshToken: string;
    let configService: ConfigService;
    let dataSource: DataSource;
    let subcategoryId: number; 

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        configService = app.get(ConfigService);
        dataSource = app.get(DataSource);
        
        app.use(cookieParser());
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            transform: true,
        }));
        app.setGlobalPrefix('api');

        await app.init();

        await dataSource.query('DELETE FROM products');
        await dataSource.query('DELETE FROM subcategories');
        await dataSource.query('DELETE FROM categories');
        await dataSource.query('DELETE FROM users WHERE email = $1', ['admin@test.com']);

        const categoryResult = await dataSource.query(
            `INSERT INTO categories (name) VALUES ('Test Category') RETURNING id`
        );
        const categoryId = categoryResult[0].id;

        const subcategoryResult = await dataSource.query(
            `INSERT INTO subcategories (name, "categoryId") VALUES ('Test Subcategory', $1) RETURNING id`,
            [categoryId]
        );
        subcategoryId = subcategoryResult[0].id;

        await request(app.getHttpServer())
            .post('/api/auth/register')
            .set('User-Agent', 'jest-test')
            .send({
                email: 'admin@test.com',
                password: 'admin123456',
                repeatPassword: 'admin123456',
            });

        await dataSource.query(
            `UPDATE users SET role = 'Admin' WHERE email = 'admin@test.com'`
        );

        const loginResponse = await request(app.getHttpServer())
            .post('/api/auth/login')
            .set('User-Agent', 'jest-test')
            .send({
                email: 'admin@test.com',
                password: 'admin123456'
            });

        console.log('Login Response:', loginResponse.body);

        const cookies = loginResponse.headers['set-cookie'];
        if (cookies && Array.isArray(cookies)) {
            const refreshCookie = cookies.find(cookie => cookie.includes(REFRESH_TOKEN));
            if (refreshCookie) {
                refreshToken = refreshCookie.split(';')[0].split('=')[1];
            }
        }
        authToken = loginResponse.body.accessToken;

        if (!authToken) {
            throw new Error('Failed to get auth token');
        }
    });

    afterAll(async () => {
        await app.close();
    });

    describe('Admin Products', () => {
        let productId: number;

        it('should create a new product', async () => {
            const createProductDto = {
                price: 100,
                title: 'Test Product',
                mainPhoto: 'photo.jpg',
                description: 'Description',
                subcategoryId: subcategoryId,
                images: ['image1.jpg'],
            };

            const createResponse = await request(app.getHttpServer())
                .post('/api/admin/products')
                .set('Authorization', `Bearer ${authToken}`)
                .send(createProductDto);

            console.log('Create Product Response:', createResponse.body);
            expect(createResponse.status).toBe(201);
            
            const result = await dataSource.query(
                'SELECT id FROM products WHERE title = $1 ORDER BY id DESC LIMIT 1',
                ['Test Product']
            );
            productId = result[0].id;
            console.log('Created Product ID:', productId);
        });

        it('should update an existing product', async () => {
            const updateProductDto = {
                title: 'Updated Product',
            };

            await request(app.getHttpServer())
                .put(`/api/admin/products/${productId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(updateProductDto)
                .expect(200);
        });

        it('should delete an existing product', async () => {
            await request(app.getHttpServer())
                .delete(`/api/admin/products/${productId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);
        });

        it('should fail to update non-existent product', async () => {
            await request(app.getHttpServer())
                .put('/api/admin/products/99999')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ title: 'Updated Product' })
                .expect(404);
        });
    });
});