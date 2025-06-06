import { IsOptional, IsNumber, IsEnum, IsDate, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '../../../../web/orders/enums/order-status.enum';

export class GetOrdersFilterDto {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    userId?: number;

    @IsOptional()
    @IsEnum(OrderStatus, { message: 'Invalid order status provided' })
    status?: OrderStatus;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    take?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    skip?: number;
}
