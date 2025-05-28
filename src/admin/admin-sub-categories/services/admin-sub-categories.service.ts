import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IMessage } from 'src/common/dto/responses/message.response';
import { UpdateCategoryDto } from '../../admin-categories/dtos/update-category.dto';
import { ISubCategory } from 'src/web/sub-categories/interfaces/sub-category.interface';
import { CategoryRepository } from 'src/web/categories/repositories/category.repository';
import { SubCategoryRepository } from 'src/web/sub-categories/repositories/sub-category.repository';
import { CreateSubCategoryDto } from '../dtos/create-sub-category.dto';

@Injectable()
export class AdminSubCategoriesService {
    constructor(
        private readonly subCategoryRepository: SubCategoryRepository,
        private readonly categoryRepository: CategoryRepository,
    ) {}

    async createSubCategory(dto: CreateSubCategoryDto): Promise<ISubCategory> {
        const { categoryId, name } = dto;

        const existingCategory = await this.categoryRepository.getOne({ where: { id: categoryId } });

        if (!existingCategory) {
            throw new NotFoundException(`Category with ID ${categoryId} not found.`); 
        }

        const existingSubCategory = await this.subCategoryRepository.getOne({
            where: { name: dto.name },
        });

        if (existingSubCategory) {
            throw new ConflictException('Sub-category with this name already exists.'); 
        }

        const newCategory = await this.subCategoryRepository.create({
            name,
            category: existingCategory
        });

        return this.subCategoryRepository.save(newCategory);
    }

    async updateSubCategory(dto: UpdateCategoryDto): Promise<ISubCategory> {
        const { id, name } = dto;

        const category = await this.subCategoryRepository.getOne({ where: { id } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found.`);
        }

        category.name = name;

        return this.subCategoryRepository.save(category);
    }

    async removeSubCategory(subCategoryId: number): Promise<IMessage> {
        const subCategory = await this.subCategoryRepository.getOne({
            where: { id: subCategoryId },
            relations: ['products'],
        });

        if (!subCategory) {
            throw new NotFoundException(`Sub-category with ID ${subCategoryId} not found.`);
        }
    
        if (subCategory.products?.length > 0) {
            throw new BadRequestException('Cannot delete a sub-category that has products.');
        }
    
        const deleteResult = await this.subCategoryRepository.remove(subCategory.id);
        if (!deleteResult) {
            throw new InternalServerErrorException('An error occurred while deleting the sub-category.');
        }
    
        return { message: `Sub-category with ID ${subCategoryId} has been successfully deleted.` };
    }
}