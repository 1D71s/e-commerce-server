import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetProductsFiltersDto {
    @IsString()
    @IsOptional()
    search?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    take?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    сategoryId?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    skip?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    priceMin?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    priceMax?: number;
}