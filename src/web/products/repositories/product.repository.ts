import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { IProduct } from '../interfaces/product.interface';
import { IProductsRepository } from '../interfaces/product-repository.interface';
import { GetProductsFiltersDto } from '../dtos/requests/get-products-filters.dto';

@Injectable()
export class ProductsRepository implements IProductsRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly repository: Repository<ProductEntity>
    ) {}

    async getOne(options: FindOneOptions<ProductEntity>): Promise<ProductEntity> {
        return await this.repository.findOne(options);
    }

    async findManyByFilters(dto: GetProductsFiltersDto): Promise<[IProduct[], number]> {
        const { search, priceMin, priceMax, take = 10, skip = 0 } = dto;

        const queryBuilder = this.repository.createQueryBuilder('product');

        if (search) {
            queryBuilder.andWhere('product.title ILIKE :search', { search: `%${search}%` });
        }

        if (priceMin !== undefined) {
            queryBuilder.andWhere('product.price >= :priceMin', { priceMin: Number(priceMin) });
        }

        if (priceMax !== undefined) {
            queryBuilder.andWhere('product.price <= :priceMax', { priceMax: Number(priceMax) });
        }

        queryBuilder.skip(skip).take(take);

        return await queryBuilder.getManyAndCount();
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