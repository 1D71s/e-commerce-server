import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoryEntity } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './repositories/category.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CategoryEntity,
        ])
    ],
    controllers: [
        CategoriesController,
    ],
    providers: [
        CategoryRepository,
        CategoriesService,
    ],
    exports: [
        CategoryRepository,
    ]
})
export class CategoriesModule {}
