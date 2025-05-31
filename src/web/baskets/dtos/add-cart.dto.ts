import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddCartDto {
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}