import { ICategory } from './category.interface';
import { IProduct } from 'src/products/interfaces/product.interface';

export class ISubCategory {
    id: number;
    name: string;
    category: ICategory;
    products: IProduct[];
}