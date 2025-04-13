import { Controller, Get, Param } from '@nestjs/common';
import { ISubCategory } from '../interfaces/sub-category.interface';
import { SubCategoriesService } from '../services/sub-categories.service';

@Controller('sub-categories')
export class SubCategoriesController {
    constructor(private readonly subCategoriesService: SubCategoriesService) {}

    @Get(':parentId')
    async getSubCategoriesByParent(@Param("parentId") parentId: number): Promise<ISubCategory[]> {
        return this.subCategoriesService.getSubCategoriesByParent(parentId);
    }
}