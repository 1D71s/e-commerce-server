import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { IProduct } from '../interfaces/product.interface';
import { IProductsRepository } from '../interfaces/product-repository.interface';
import { GetProductsFiltersDto } from '../dtos/requests/get-products-filters.dto';
import { ProductsQueryBuilder } from '../services/products-query.builder';

@Injectable()
export class ProductsRepository implements IProductsRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly repository: Repository<ProductEntity>
    ) {}

    async getOne(options: FindOneOptions<ProductEntity>): Promise<ProductEntity> {
        return await this.repository.findOne(options);
    }

    async findManyByFilters(dto: GetProductsFiltersDto): Promise<[ProductEntity[], number]> {
        const queryBuilder = this.repository.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category'); // 👈 додаємо підтягання категорій

        const builder = new ProductsQueryBuilder(queryBuilder)
            .withSubCategory(dto.сategoryId)
            .withSearch(dto.search)
            .withPriceRange(dto.priceMin, dto.priceMax)
            .withPagination(dto.skip, dto.take);

        return await builder.build().getManyAndCount();
    }

    async create(product: Partial<IProduct>): Promise<IProduct> {
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