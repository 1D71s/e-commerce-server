import { Injectable } from '@nestjs/common';
import { SubCategoryRepository } from '../repositories/sub-category.repository';
import { ISubCategory } from '../../sub-categories/interfaces/sub-category.interface';

@Injectable()
export class SubCategoriesService {
    constructor(
        private readonly subCategoryRepository: SubCategoryRepository
    ) {}

    async getSubCategoriesByParent(parentId: number): Promise<ISubCategory[]> {
        return await this.subCategoryRepository.getByParent({ 
            where: { category: { id: parentId } },
        });
    }

    async getAllSubCategories(): Promise<ISubCategory[]> {
        return await this.subCategoryRepository.getAll();
    }
}