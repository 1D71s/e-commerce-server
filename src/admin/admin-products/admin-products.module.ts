import { Module } from '@nestjs/common';
import { AdminProductsService } from './services/admin-products.service';
import { AdminProductsController } from './controllers/admin-products.controller';
import { ProductsModule } from 'src/web/products/product.module';
import { SubCategoriesModule } from 'src/web/sub-categories/sub-categories.module';

@Module({
    imports: [
        ProductsModule,
        SubCategoriesModule
    ],
    controllers: [AdminProductsController],
    providers: [AdminProductsService],
})
export class AdminProductsModule {}
