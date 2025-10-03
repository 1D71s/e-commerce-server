import { SelectQueryBuilder } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

export class ProductsQueryBuilder {
    constructor(private readonly queryBuilder: SelectQueryBuilder<ProductEntity>) {}

    withSubCategory(categoryId?: number): this {
        if (categoryId) {
            this.queryBuilder.andWhere('product.category.id = :categoryId', { categoryId });
        }
        return this;
    }

    withSearch(search?: string): this {
        if (search) {
            this.queryBuilder.andWhere('product.title ILIKE :search', { search: `%${search}%` });
        }
        return this;
    }

    withPriceRange(priceMin?: number, priceMax?: number): this {
        if (priceMin !== undefined) {
            this.queryBuilder.andWhere('product.price >= :priceMin', { priceMin });
        }
        if (priceMax !== undefined) {
            this.queryBuilder.andWhere('product.price <= :priceMax', { priceMax });
        }
        return this;
    }

    withPagination(skip: number = 0, take: number = 10): this {
        this.queryBuilder.skip(skip).take(take);
        return this;
    }

    build(): SelectQueryBuilder<ProductEntity> {
        return this.queryBuilder;
    }
}