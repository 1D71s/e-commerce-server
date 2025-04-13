import { Module } from '@nestjs/common';
import { AdminCategoriesService } from './services/admin-categories.service';
import { AdminCategoriesController } from './controllers/admin-categories.controller';
import { CategoriesModule } from 'src/categories/categories.module';
import { AdminSubCategoriesController } from './controllers/admin-sub-categories.controller';
import { AdminSubCategoriesService } from './services/admin-dub-categories.service';

@Module({
    imports: [
        CategoriesModule,
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
