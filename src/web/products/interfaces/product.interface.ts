import { IProductImages } from "./product-images.interface";
import { IAdminUser } from '../../../admin/admin-users/interfaces/admin-user.interface';
import { IProductProperties } from './product-properties.interface';
import { ICategory } from "src/web/categories/interfaces/category.interface";

export class IProduct {
    id: number;
    title: string;
    admin: IAdminUser;
    mainPhoto: string;
    price: number;
    images: IProductImages[]
    description: string;
    properties: IProductProperties;
    category: ICategory[]
}
