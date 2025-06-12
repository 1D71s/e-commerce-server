import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QuantitiesOrderDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    quantity: number;

    @IsString()
    @IsOptional()
    sizeProduct: string;
}
