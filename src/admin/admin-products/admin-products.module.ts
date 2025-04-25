import { Module } from '@nestjs/common';
import { AdminProductsService } from './services/admin-products.service';
import { AdminProductsController } from './controllers/admin-products.controller';
import { ProductsModule } from 'src/products/product.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
    imports: [
        ProductsModule,
        CategoriesModule
    ],
    controllers: [AdminProductsController],
    providers: [AdminProductsService],
})
export class AdminProductsModule {}
