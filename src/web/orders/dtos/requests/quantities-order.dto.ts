import { IsNumber } from 'class-validator';

export class QuantitiesOrderDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    quantity: number;
}
