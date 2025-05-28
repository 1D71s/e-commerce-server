import { IProduct } from "./product.interface";
import { ProductEntity } from "../entities/product.entity";
import { FindOneOptions } from "typeorm";

export interface IProductsRepository {
    getOne(options: FindOneOptions<ProductEntity>): Promise<ProductEntity>;
    getAll(): Promise<IProduct[]>;
    getManyBySubCategoryId(scId: number, limit: number, page: number): Promise<IProduct[]>;
    create(product: IProduct): Promise<IProduct>;
    merge(target: ProductEntity, source: Partial<IProduct>): Promise<IProduct>;
    save(product: IProduct): Promise<IProduct>;
    delete(product: ProductEntity): Promise<void>;
}