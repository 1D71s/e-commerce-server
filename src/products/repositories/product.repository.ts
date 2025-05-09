import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { IProduct } from '../interfaces/product.interface';
import { IProductsRepository } from '../interfaces/product-repository.interface';

@Injectable()
export class ProductsRepository implements IProductsRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly repository: Repository<ProductEntity>
    ) {}

    async getOne(options: FindOneOptions<ProductEntity>): Promise<ProductEntity> {
        return await this.repository.findOne(options);
    }

    async getAll(): Promise<IProduct[]> {
        return this.repository.find();
    }

    async getMany(options: FindManyOptions<ProductEntity>): Promise<IProduct[]> {
        return await this.repository.find(options);
    }

    async getManyBySubCategoryId(scId: number, limit: number, page: number): Promise<IProduct[]> {
        return this.repository.find({
            where: { subCategory: { id: scId } },
            take: limit,
            skip: (page - 1) * limit,
        });
    }

    async create(product: IProduct): Promise<IProduct> {
        return this.repository.create(product);
    }

    async merge(target: ProductEntity, source: IProduct): Promise<IProduct> {
        return this.repository.merge(target, source);
    }

    async save(product: IProduct): Promise<IProduct> {
        return this.repository.save(product);
    }

    async delete(product: ProductEntity): Promise<void> {
        await this.repository.remove(product);
    }
}