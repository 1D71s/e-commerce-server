import { IProduct } from '../../products/interfaces/product.interface';
import { IUser } from '../../users/interfaces/user.interface';

export class ICartItem {
    id: number;
    user: IUser;
    product: IProduct;
    quantity: number;
}
