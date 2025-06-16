import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { ProductsRepository } from './repositories/product.repository';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImagesEntity } from './entities/product-images.entity';
import { ProductImagesRepository } from './repositories/product-images.repository';
import { ProductSizeEntity } from './entities/product-size.entity';
import { ProductPropertyEntity } from './entities/product-property.entity';
import { ProductSizeRepository } from './repositories/product-size.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductEntity,
            ProductImagesEntity,
            ProductSizeEntity,
            ProductPropertyEntity
        ])
    ],
    controllers: [
        ProductsController
    ],
    providers: [
        ProductsService, 
        ProductsRepository,
        ProductImagesRepository,
        ProductSizeRepository
    ],
    exports: [
        ProductsRepository,
        ProductImagesRepository,
        ProductSizeRepository,
    ]
})
export class ProductsModule {}