import { Module } from '@nestjs/common';
import { AdminCategoriesService } from './services/admin-categories.service';
import { AdminCategoriesController } from './controllers/admin-categories.controller';
import { AdminSubCategoriesController } from '../admin-sub-categories/controllers/admin-sub-categories.controller';
import { AdminSubCategoriesService } from '../admin-sub-categories/services/admin-sub-categories.service';
import { CategoriesModule } from 'src/web/categories/categories.module';
import { SubCategoriesModule } from 'src/web/sub-categories/sub-categories.module';

@Module({
    imports: [
        CategoriesModule,
        SubCategoriesModule
    ],
    controllers: [
        AdminCategoriesController,
        AdminSubCategoriesController
    ],
    providers: [
        AdminCategoriesService,
        AdminSubCategoriesService
    ],
})
export class AdminCategoriesModule {}
