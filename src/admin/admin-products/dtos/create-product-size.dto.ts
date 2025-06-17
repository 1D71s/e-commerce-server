import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductSizeDto {

    @IsString()
    @IsNotEmpty()
    value: string
}