import { IProduct } from 'src/web/products/interfaces/product.interface';
import { ICategory } from '../../categories/interfaces/category.interface';

export class ISubCategory {
    id: number;
    name: string;
    category: ICategory;
    products: IProduct[];
}