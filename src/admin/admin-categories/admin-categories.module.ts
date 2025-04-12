import { Module } from '@nestjs/common';
import { AdminCategoriesService } from './services/admin-categories.service';
import { AdminCategoriesController } from './controllers/admin-categories.controller';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
    imports: [
        CategoriesModule,
    ],
    controllers: [AdminCategoriesController],
    providers: [AdminCategoriesService],
})
export class AdminCategoriesModule {}
