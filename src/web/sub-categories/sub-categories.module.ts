import { Module } from '@nestjs/common';
import { SubCategoriesController } from './controllers/sub-categories.controller';
import { SubCategoriesService } from './services/sub-categories.service';
import { SubCategoryRepository } from './repositories/sub-category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoryEntity } from './entities/sub-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        SubcategoryEntity,
    ])
  ],
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService, SubCategoryRepository],
  exports: [SubCategoryRepository]
})
export class SubCategoriesModule {}
