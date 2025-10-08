import { IProduct } from './product.interface';
import { IProductSize } from './product-size.interface';
import { IProductColor } from './product-color.interface';
import { IProductPropertyItem } from './product-property-item.interface';

export interface IProductProperties {
    id: number;
    colors: IProductColor[];
    sizes: IProductSize[];
    propertyItems: IProductPropertyItem[]
    product: IProduct;
}