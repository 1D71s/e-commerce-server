import { Controller, Get } from '@nestjs/common';
import { ICategory } from '../interfaces/category.interface';
import { CategoriesService } from '../services/categories.service';

@Controller()
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService
    ) {}

    @Get()
    async getAll(): Promise<ICategory[]> {
        return this.categoriesService.getAll();
    }
}
