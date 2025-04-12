import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from 'src/categories/reposiroties/category.repository';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { ICategory } from 'src/categories/interfaces/category.interface';
import { IMessage } from 'src/common/dto/responses/message.response';

@Injectable()
export class AdminCategoriesService {
    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {}

    async createCategory(dto: CreateCategoryDto): Promise<ICategory> {
        const newCategory = await this.categoryRepository.create(dto);
        return this.categoryRepository.save(newCategory);
    }

    async removeCategory(categoryId: number): Promise<IMessage> {
        const category = await this.categoryRepository.getById(categoryId);
        if (!category) {
            throw new NotFoundException(`Category with ID ${categoryId} not found.`);
        }
    
        if (category.subcategories?.length > 0) {
            throw new BadRequestException('Cannot delete a category that has subcategories.');
        }
    
        const deleteResult = await this.categoryRepository.remove(category.id);
        if (!deleteResult) {
            throw new InternalServerErrorException('An error occurred while deleting the category.');
        }
    
        return { message: `Category with ID ${categoryId} has been successfully deleted.` };
    }
}