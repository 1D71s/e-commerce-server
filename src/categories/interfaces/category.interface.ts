import { ISubCategory } from "./sub-category.interface";

export class ICategory {
    id: number;
    name: string;
    subcategories: ISubCategory[];
}
