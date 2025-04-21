import { IProduct } from "./product.interface";
import { ProductEntity } from "../entities/product.entity";

export interface IProductsRepository {
    getOne(id: number): Promise<IProduct>;
    getAll(): Promise<IProduct[]>;
    getManyBySubCategoryId(scId: number, limit: number, page: number): Promise<IProduct[]>;
    create(product: IProduct): Promise<IProduct>;
    merge(target: ProductEntity, source: Partial<IProduct>): Promise<IProduct>;
    save(product: IProduct): Promise<IProduct>;
    delete(product: ProductEntity): Promise<void>;
}