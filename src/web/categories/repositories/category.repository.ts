import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { ICategory } from '../interfaces/category.interface';
import { CreateCategoryDto } from 'src/admin/admin-categories/dtos/create-category.dto';

@Injectable()
export class CategoryRepository  {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly repository: Repository<CategoryEntity>
    ) {}

    async getOne(options: FindOneOptions<ICategory>): Promise<ICategory> {
        return this.repository.findOne(options);
    }

    async getAll(): Promise<ICategory[]> {
        return this.repository.find();
    }

    async create(dto: CreateCategoryDto): Promise<ICategory> {
        return this.repository.create(dto); 
    }

    async save(category: ICategory): Promise<ICategory> {
        return this.repository.save(category);
    }

    async remove(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
}