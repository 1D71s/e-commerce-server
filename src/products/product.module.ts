import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { ProductsRepository } from './repositories/product.repository';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImagesEntity } from './entities/product-images.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductEntity,
            ProductImagesEntity
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
