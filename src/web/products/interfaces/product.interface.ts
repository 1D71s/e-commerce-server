import { ISubCategory } from "src/web/sub-categories/interfaces/sub-category.interface";
import { IProductImages } from "./product-images.interface";

export class IProduct {
    id: number;
    title: string;
    mainPhoto: string;
    price: number;
    images: IProductImages[]
    description: string;
    subCategory: ISubCategory;
}
