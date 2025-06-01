import { IProduct } from '../../products/interfaces/product.interface';
import { IOrder } from './order.interface';

export interface IOrderQuantity {
    id: number;
    order: IOrder;
    product: IProduct;
    quantity: number;
}