import { Injectable } from '@nestjs/common';
import { SubcategoryEntity } from '../entities/sub-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, Repository } from 'typeorm';
import { ISubCategory } from '../interfaces/sub-category.interface';
import { CreateSubCategoryDto } from 'src/admin/admin-categories/dtos/create-sub-category.dto';

@Injectable()
export class SubCategoryRepository  {
    constructor(
        @InjectRepository(SubcategoryEntity)
        private readonly repository: Repository<SubcategoryEntity>
    ) {}

    async getOne(options: FindOneOptions<ISubCategory>): Promise<ISubCategory> {
        return this.repository.findOne(options);
    }

    async getByParent(options: FindOneOptions<ISubCategory>): Promise<ISubCategory[]> {
        return this.repository.find(options);
    }

    async getAll(): Promise<ISubCategory[]> {
        return this.repository.find();
    }

    async create(dto: Partial<ISubCategory>): Promise<ISubCategory> {
        return this.repository.create(dto);
    }    

    async save(category: ISubCategory): Promise<ISubCategory> {
        return this.repository.save(category);
    }

    async remove(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
}