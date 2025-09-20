import { Injectable } from '@nestjs/common';
import { ICategory } from '../interfaces/category.interface';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoriesService {
    constructor(
        private readonly categoryRepository: CategoryRepository
    ) {}
    
    async getAll(): Promise<ICategory[]> {
        return this.categoryRepository.getAll();
    }
}
