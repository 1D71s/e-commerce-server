import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from 'src/categories/reposiroties/category.repository';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { ICategory } from 'src/categories/interfaces/category.interface';
import { IMessage } from 'src/common/dto/responses/message.response';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Injectable()
export class AdminCategoriesService {
    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {}

    async createCategory(dto: CreateCategoryDto): Promise<ICategory> {
        const existingCategory = await this.categoryRepository.getOne({
            where: { name: dto.name },
        });

        if (existingCategory) {
            throw new ConflictException('Category with this name already exists.'); 
        }

        const newCategory = await this.categoryRepository.create(dto);
        return this.categoryRepository.save(newCategory);
    }

    async updateCategory(dto: UpdateCategoryDto): Promise<ICategory> {
        const { id, name } = dto;

        const category = await this.categoryRepository.getOne({ where: { id } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found.`);
        }

        category.name = name;

        return this.categoryRepository.save(category);
    }

    async removeCategory(categoryId: number): Promise<IMessage> {
        const category = await this.categoryRepository.getOne({
            where: { id: categoryId },
            relations: ['subcategories'],
        });

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