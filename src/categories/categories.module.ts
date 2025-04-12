import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoryEntity } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoryEntity } from './entities/sub-category.entity';
import { SubCategoriesController } from './controllers/sub-categories.controller';
import { SubCategoriesService } from './services/sub-categories.service';
import { CategoryRepository } from './reposiroties/category.repository';
import { SubCategoryRepository } from './reposiroties/sub-category.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CategoryEntity,
            SubcategoryEntity,
        ])
    ],
    controllers: [
        CategoriesController,
        SubCategoriesController
    ],
    providers: [
        CategoryRepository,
        CategoriesService,
        SubCategoriesService,
        SubCategoryRepository
    ],
    exports: [
        CategoryRepository,
        SubCategoryRepository
    ]
})
export class CategoriesModule {}
