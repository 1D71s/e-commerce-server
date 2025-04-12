import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { ProductsRepository } from './repositories/product.repository';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductEntity
        ])
    ],
    controllers: [
        ProductsController
    ],
    providers: [
        ProductsService, 
        ProductsRepository
    ],
})
export class ProductsModule {}
