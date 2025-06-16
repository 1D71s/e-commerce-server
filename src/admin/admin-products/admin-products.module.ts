import { Module } from '@nestjs/common';
import { AdminProductsService } from './services/admin-products.service';
import { AdminProductsController } from './controllers/admin-products.controller';
import { ProductsModule } from 'src/web/products/product.module';
import { SubCategoriesModule } from 'src/web/sub-categories/sub-categories.module';
import { UsersModule } from 'src/web/users/users.module';
import { FilesModule } from '../../files/files.module';

@Module({
    imports: [
        ProductsModule,
        SubCategoriesModule,
        UsersModule,
        FilesModule
    ],
    controllers: [AdminProductsController],
    providers: [AdminProductsService],
})
export class AdminProductsModule {}
