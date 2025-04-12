import { ICategory } from './category.interface';
import { IProduct } from 'src/products/imterfaces/product.interface';

export class ISubCategory {
    id: number;
    name: string;
    category: ICategory;
    products: IProduct[];
}