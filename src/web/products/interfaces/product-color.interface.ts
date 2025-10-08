import { ProductPropertyEntity } from "../entities/product-property.entity";

export interface IProductColor {
    id: number;
    value: string;
    createdAt: Date;
    updatedAt: Date;
    productProperty: ProductPropertyEntity;
}