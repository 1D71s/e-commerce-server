import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './api/categories.controller';
import { CategoryEntity } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryEntity,
    ])
  ],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
  ],
})
export class CategoriesModule {}
