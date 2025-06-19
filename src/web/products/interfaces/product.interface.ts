import { ISubCategory } from "src/web/sub-categories/interfaces/sub-category.interface";
import { IProductImages } from "./product-images.interface";
import { IAdminUser } from '../../../admin/admin-users/interfaces/admin-user.interface';
import { IProductSize } from './product-size.interface';

export class IProduct {
    id: number;
    title: string;
    admin: IAdminUser;
    mainPhoto: string;
    price: number;
    images: IProductImages[]
    description: string;
    subCategory: ISubCategory;
    sizes: IProductSize[];
}
