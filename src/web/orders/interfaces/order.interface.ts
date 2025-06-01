import { IUser } from '../../users/interfaces/user.interface';
import { IOrderQuantity } from './order-quantity.interface';
import { IOrderAddress } from './order-address.interface';

export interface IOrder {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    user: IUser;
    quantities: IOrderQuantity[];
    address: IOrderAddress
}