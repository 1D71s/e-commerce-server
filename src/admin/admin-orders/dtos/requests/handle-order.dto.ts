import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../../../../web/orders/enums/order-status.enum';

export class HandleOrderDto {

    @IsNotEmpty()
    @IsEnum(OrderStatus, { message: 'Invalid order status provided' })
    status?: OrderStatus;
}