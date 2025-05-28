import { ISubCategory } from "../../sub-categories/interfaces/sub-category.interface";

export class ICategory {
    id: number;
    name: string;
    subcategories: ISubCategory[];
}
