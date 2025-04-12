import { Injectable } from '@nestjs/common';
import { SubcategoryEntity } from '../entities/sub-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubCategoryRepository  {
    constructor(
        @InjectRepository(SubcategoryEntity)
        private readonly repository: Repository<SubcategoryEntity>
    ) {}
}