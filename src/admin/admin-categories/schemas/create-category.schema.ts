import { ICategory } from "src/web/categories/interfaces/category.interface";

export interface CreateCategorySchema {
    name: string;
    parent: ICategory
}