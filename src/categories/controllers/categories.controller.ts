import { Controller, Get } from '@nestjs/common';
import { CategoryRepository } from '../reposiroties/category.repository';
import { ICategory } from '../interfaces/category.interface';

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoryRepository: CategoryRepository
    ) {}

    @Get()
    async getAll(): Promise<ICategory[]> {
        return this.categoryRepository.getAll();
    }
}
