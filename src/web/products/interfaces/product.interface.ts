import { ISubCategory } from "src/web/sub-categories/interfaces/sub-category.interface";
import { IProductImages } from "./product-images.interface";
import { IUser } from '../../users/interfaces/user.interface';

export class IProduct {
    id: number;
    title: string;
    user: IUser;
    mainPhoto: string;
    price: number;
    images: IProductImages[]
    description: string;
    subCategory: ISubCategory;
}
