import { IProduct } from "./product.interface";
import { ProductEntity } from "../entities/product.entity";
import { FindManyOptions, FindOneOptions } from 'typeorm';

export interface IProductsRepository {
    getOne(options: FindOneOptions<ProductEntity>): Promise<ProductEntity>;
    create(product: IProduct): Promise<IProduct>;
    findManyByFilters(options: FindManyOptions<ProductEntity>): Promise<[IProduct[], number]>;
    merge(target: ProductEntity, source: Partial<IProduct>): Promise<IProduct>;
    save(product: IProduct): Promise<IProduct>;
    delete(product: ProductEntity): Promise<void>;
}