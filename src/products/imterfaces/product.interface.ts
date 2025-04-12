import { ISubCategory } from "src/categories/interfaces/sub-category.interface";

export class IProduct {
    id: number;
    name: string;
    primaryPhoto: string;
    description: string;
    subcategory: ISubCategory;
}
