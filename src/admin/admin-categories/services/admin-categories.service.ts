import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { IMessage } from 'src/common/dto/responses/message.response';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { ICategory } from 'src/web/categories/interfaces/category.interface';
import { CategoryRepository } from 'src/web/categories/repositories/category.repository';
import { CreateCategorySchema } from '../schemas/create-category.schema';
import { In } from 'typeorm';

@Injectable()
export class AdminCategoriesService {
    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {}

    async getAll(parentId?: number): Promise<ICategory[]> {
        const where = parentId !== undefined ? { parent: { id: parentId } } : {};
        return this.categoryRepository.getAll({
            where,
            relations: ['parent'],
        });
    }

    async createCategory(dto: CreateCategoryDto): Promise<ICategory> {
        const { name, parentId } = dto;

        const existingCategory = await this.categoryRepository.getOne({
            where: { name },
        });
        
        if (existingCategory) {
            throw new ConflictException('Category with this name already exists.');
        }

        let parent: ICategory = null;

        if (parentId) {
            parent = await this.categoryRepository.getOne({
                where: { id: parentId },
            });
            if (!parent) {
                throw new NotFoundException('Parent category not found.');
            }
        }

        const schema: CreateCategorySchema = {
            name,
            parent,
        };

        const newCategory = await this.categoryRepository.create(schema);

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

    async removeCategories(categoryIds: number[]): Promise<IMessage> {
        const categories = await this.categoryRepository.getAll({
            where: { id: In(categoryIds) },
        });

        if (categories.length === 0) {
            throw new NotFoundException(
                `No categories found for provided IDs: ${categoryIds.join(', ')}`,
            );
        }

        await this.categoryRepository.removeByIds(categoryIds);

        return {
            message: `Categories with IDs [${categoryIds.join(', ')}] have been successfully deleted.`,
        };
    }
}
