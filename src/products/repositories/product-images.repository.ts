import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ProductImagesEntity } from '../entities/product-images.entity';
import { IProductImages } from '../interfaces/product-images.interface';

@Injectable()
export class ProductImagesRepository {
    constructor(
        @InjectRepository(ProductImagesEntity)
        private readonly repository: Repository<ProductImagesEntity>
    ) {}

    async getOne(options: FindOneOptions<ProductImagesEntity>): Promise<IProductImages> {
        return await this.repository.findOne(options);
    }

    async getMany(options: FindManyOptions<ProductImagesEntity>): Promise<ProductImagesEntity[]> {
        return await this.repository.find(options);
    }

    async create(image: IProductImages): Promise<IProductImages> {
        return this.repository.create(image);
    }

    async save(image: IProductImages): Promise<IProductImages> {
        return this.repository.save(image);
    }

    async delete(image: ProductImagesEntity): Promise<void> {
        await this.repository.remove(image);
    }
}