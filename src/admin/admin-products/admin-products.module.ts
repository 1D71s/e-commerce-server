import { Module } from '@nestjs/common';
import { AdminProductsService } from './services/admin-products.service';
import { AdminProductsController } from './controllers/admin-products.controller';
import { ProductsModule } from 'src/web/products/product.module';
import { UsersModule } from 'src/web/users/users.module';
import { StorageModule } from '../../storage/storage.module';
import { AdminUsersModule } from '../admin-users/admin-users.module';
import { AdminProductSizeService } from './services/admin-product-size.service';
import { CategoriesModule } from 'src/web/categories/categories.module';

@Module({
    imports: [
        ProductsModule,
        UsersModule,
        StorageModule,
        AdminUsersModule,
        CategoriesModule
    ],
    controllers: [AdminProductsController],
    providers: [
        AdminProductsService,
        AdminProductSizeService
    ],
})
export class AdminProductsModule {}
