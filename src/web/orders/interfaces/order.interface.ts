import { IUser } from '../../users/interfaces/user.interface';
import { IOrderQuantity } from './order-quantity.interface';
import { IOrderAddress } from './order-address.interface';
import { PaymentMethod } from '../enums/payment-method.enum';
import { OrderStatus } from '../enums/order-status.enum';

export interface IOrder {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message?: string;
    paymentMethod?: PaymentMethod;
    status: OrderStatus;
    user?: IUser;
    quantities: IOrderQuantity[];
    address: IOrderAddress;
}