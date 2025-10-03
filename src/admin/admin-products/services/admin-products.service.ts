import { Injectable, NotFoundException } from '@nestjs/common';
import { In } from 'typeorm';
import { IMessage } from 'src/common/dto/responses/message.response';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { CreateProductDto } from '../dtos/create-product.dto';
import { IProductImages } from 'src/web/products/interfaces/product-images.interface';
import { IProduct } from 'src/web/products/interfaces/product.interface';
import { ProductImagesRepository } from 'src/web/products/repositories/product-images.repository';
import { ProductsRepository } from 'src/web/products/repositories/product.repository';
import { ProductSizeRepository } from '../../../web/products/repositories/product-size.repository';
import { StorageService } from '../../../storage/services/storage.service';
import { AdminUserRepository } from '../../admin-users/repositories/admin-user.repository';
import { IProductSize } from 'src/web/products/interfaces/product-size.interface';
import { CategoryRepository } from 'src/web/categories/repositories/category.repository';
import { IGetManyPagination } from 'src/common/dto/responses/get-many-pagination.response';
import { GetProductsFiltersDto } from 'src/web/products/dtos/requests/get-products-filters.dto';
import { ProductPropertyEntity } from 'src/web/products/entities/product-property.entity';
import { ProductEntity } from 'src/web/products/entities/product.entity';

@Injectable()
export class AdminProductsService {
    constructor(
        private readonly productRepository: ProductsRepository,
        private readonly productImagesRepository: ProductImagesRepository,
        private readonly adminUserRepository: AdminUserRepository,
        private readonly productSizeRepository: ProductSizeRepository,
        private readonly storageService: StorageService,
        private readonly categoryRepository: CategoryRepository
    ) {}

    async getManyByFilters(dto: GetProductsFiltersDto): Promise<IGetManyPagination<IProduct>> {
        const [products, total] = await this.productRepository.findManyByFilters(dto);
        return { total, data: products };
    }

    async deleteProducts(ids: number[]): Promise<IMessage> {
        const products = await this.productRepository.find({
            where: { id: In(ids) }, 
            relations: ["images"],
        });

        if (!products.length) {
            throw new NotFoundException('Products not found');
        }

        await Promise.allSettled(
            products.flatMap((product) => {
                const tasks: Promise<any>[] = [];

                if (product.mainPhoto) {
                    tasks.push(
                        this.storageService.deleteFile(product.mainPhoto).catch(() => null)
                    );
                }

                if (product.images?.length) {
                    tasks.push(
                        ...product.images.map((image) =>
                        this.storageService.deleteFile(image.imagePath).catch(() => null)
                        )
                    );
                }

                return tasks;
            })
        );

        await this.productRepository.deleteMany(products);

        return { message: `${products.length} products deleted successfully` };
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<IMessage> {
        const product = await this.productRepository.getOne({ where: { id } });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const updatedProduct = Object.assign(product, updateProductDto);
        await this.productRepository.save(updatedProduct);
        return {
            message: 'Product updated successfully', 
        }
    }

    async createProduct(dto: CreateProductDto, adminId: number): Promise<IMessage> {
        const { 
            price, 
            title, 
            mainPhoto, 
            description, 
            categoryIds,
            images, 
            sizes,
            color
        } = dto;

        const creator = await this.adminUserRepository.getOne({
            where: { id: adminId },
        })

        if (!creator) {
            throw new NotFoundException('User not found');
        }

        const categories = await this.categoryRepository.getManyByIds(categoryIds);

        if (!categories) {
            throw new NotFoundException('Subcategory not found');
        }

        const productImages = await this.handleImages(images ?? []) || [];
        const productSizes = await this.handleSizes(sizes ?? []) || [];

        const product = new IProduct();
        product.price = price;
        product.title = title;
        product.mainPhoto = mainPhoto;
        product.description = description;
        product.images = productImages;
        product.admin = creator;
        product.category = categories;

        const property = new ProductPropertyEntity();
        property.sizes = productSizes;
        property.color = color;
        property.product = product as ProductEntity;

        product.properties = property;

        await this.productRepository.save(product);
        return { message: 'Product created successfully' };
    }

    private async handleImages(images: string[]): Promise<IProductImages[]> {
        if (!images.length) return [];
        
        return await this.productImagesRepository.getMany({
            where: { imagePath: In(images) },
        });
    }

    private async handleSizes(sizes: number[]): Promise<IProductSize[]> {
        if (!sizes.length) return [];

        return await this.productSizeRepository.getMany({
            where: { id: In(sizes) },
        });
    }
}