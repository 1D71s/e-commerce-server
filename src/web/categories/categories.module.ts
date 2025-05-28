import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoryEntity } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoryEntity } from '../sub-categories/entities/sub-category.entity';
import { CategoryRepository } from './repositories/category.repository';
import { SubCategoryRepository } from '../sub-categories/repositories/sub-category.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CategoryEntity,
            SubcategoryEntity
        ])
    ],
    controllers: [
        CategoriesController,
    ],
    providers: [
        CategoryRepository,
        CategoriesService,
        SubCategoryRepository
    ],
    exports: [
        CategoryRepository,
    ]
})
export class CategoriesModule {}
