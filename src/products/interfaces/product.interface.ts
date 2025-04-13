import { ISubCategory } from "src/categories/interfaces/sub-category.interface";

export class IProduct {
    id: number;
    title: string;
    mainPhoto: string;
    price: number;
    description: string;
    subcategory: ISubCategory;
}
