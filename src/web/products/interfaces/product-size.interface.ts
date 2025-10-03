import { ProductPropertyEntity } from "../entities/product-property.entity";

export interface IProductSize {
    id: number;
    value: string;
    createdAt: Date;
    updatedAt: Date;
    productProperties: ProductPropertyEntity[];
}