import { IProduct } from './product.interface';
import { IProductSize } from './product-size.interface';
import { IProductColor } from './product-color.interface';

export interface IProductProperties {
    id: number;
    colors: IProductColor[];
    sizes: IProductSize[];
    product: IProduct;
}