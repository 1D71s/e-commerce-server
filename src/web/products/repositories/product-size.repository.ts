import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { IProductImages } from '../interfaces/product-images.interface';
import { ProductSizeEntity } from '../entities/product-size.entity';
import { IProductSize } from '../interfaces/product-size.interface';

@Injectable()
export class ProductSizeRepository {
    constructor(
      @InjectRepository(ProductSizeEntity)
      private readonly repository: Repository<ProductSizeEntity>
    ) {}

    async getOne(options: FindOneOptions<ProductSizeEntity>): Promise<IProductSize> {
        return await this.repository.findOne(options);
    }

    async getMany(options: FindManyOptions<ProductSizeEntity>): Promise<IProductSize[]> {
        return await this.repository.find(options);
    }

    async create(size: IProductImages): Promise<IProductSize> {
        return this.repository.create(size);
    }

    async save(size: IProductImages): Promise<IProductImages> {
        return this.repository.save(size);
    }

    async delete(size: ProductSizeEntity): Promise<void> {
        await this.repository.remove(size);
    }
}