import { Injectable } from '@nestjs/common';
import { SubCategoryRepository } from '../reposiroties/sub-category.repository';
import { ISubCategory } from '../interfaces/sub-category.interface';

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