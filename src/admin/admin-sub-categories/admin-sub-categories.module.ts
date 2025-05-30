import { Module } from '@nestjs/common';
import { AdminSubCategoriesService } from './services/admin-sub-categories.service';
import { AdminSubCategoriesController } from './controllers/admin-sub-categories.controller';
import { SubCategoriesModule } from 'src/web/sub-categories/sub-categories.module';
import { CategoriesModule } from 'src/web/categories/categories.module';
import { UsersModule } from 'src/web/users/users.module';

@Module({
  imports: [SubCategoriesModule, CategoriesModule, UsersModule],
  controllers: [AdminSubCategoriesController],
  providers: [AdminSubCategoriesService],
})
export class AdminSubCategoriesModule {}
