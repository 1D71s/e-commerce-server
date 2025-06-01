import { DeliveryProvider } from '../enums/delivery-provider.enum';

export interface IOrderAddress {
    id: number;
    deliveryProvider: DeliveryProvider;
    address: string;
    city: string;
    zipCode: string;
    message: string;
}