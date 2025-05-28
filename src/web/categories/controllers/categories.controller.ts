import { Controller, Get } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';
import { ICategory } from '../interfaces/category.interface';

@Controller()
export class CategoriesController {
    constructor(
        private readonly categoryRepository: CategoryRepository
    ) {}

    @Get()
    async getAll(): Promise<ICategory[]> {
        return this.categoryRepository.getAll();
    }
}
