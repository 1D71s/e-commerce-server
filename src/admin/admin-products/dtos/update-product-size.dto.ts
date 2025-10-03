import { IsOptional, IsString } from 'class-validator';

export class UpdateProductSizeDto {
    @IsOptional()
    @IsString()
    value?: string
}