import { IProduct } from './product.interface';
import { IProductSize } from './product-size.interface';

export interface IProductProperties {
    id: number;
    color: string;
    sizes: IProductSize[];
    product: IProduct;
}