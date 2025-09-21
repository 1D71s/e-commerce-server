import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, FindOneOptions, In, Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { ICategory } from '../interfaces/category.interface';
import { CreateCategorySchema } from 'src/admin/admin-categories/schemas/create-category.schema';

@Injectable()
export class CategoryRepository  {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly repository: Repository<CategoryEntity>
    ) {}

    async getOne(options: FindOneOptions<ICategory>): Promise<ICategory> {
        return this.repository.findOne(options);
    }

    async getAll(options?: FindManyOptions<ICategory>): Promise<ICategory[]> {
        return this.repository.find(options);
    }

    async getManyByIds(categoryIds: number[]): Promise<ICategory[]>  {
        return this.repository.find({
            where: { id: In(categoryIds) }
        });
    }

    async create(category: CreateCategorySchema): Promise<ICategory> {
        return this.repository.create(category); 
    }

    async save(category: ICategory): Promise<ICategory> {
        return this.repository.save(category);
    }

    async remove(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }

    async removeByIds(ids: number[]): Promise<DeleteResult> {
        return this.repository.delete({ id: In(ids) });
    }
}