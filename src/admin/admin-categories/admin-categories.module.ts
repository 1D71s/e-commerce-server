import { Module } from '@nestjs/common';
import { AdminCategoriesService } from './services/admin-categories.service';
import { AdminCategoriesController } from './controllers/admin-categories.controller';
import { CategoriesModule } from 'src/web/categories/categories.module';
import { UsersModule } from 'src/web/users/users.module';

@Module({
    imports: [
        CategoriesModule,
        UsersModule
    ],
    controllers: [
        AdminCategoriesController,
    ],
    providers: [
        AdminCategoriesService,
    ],
})
export class AdminCategoriesModule {}
