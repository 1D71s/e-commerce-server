import { 
    IsNotEmpty, 
    IsString, 
    IsOptional, 
    IsNumber, 
    Min, 
    MaxLength, 
    IsArray, 
    IsUrl, 
    IsInt
} from "class-validator";
import { IProductDto } from "../interfaces/product-dto.interface";

export class CreateProductDto implements IProductDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0, { message: "Price must be at least 0." })
    price: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(200, { message: "Title must not exceed 200 characters." })
    title: string;

    @IsNotEmpty()
    @IsString()
    @IsUrl({}, { message: "Main photo must be a valid URL." })
    mainPhoto: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsArray()
    @IsInt({ each: true, message: "Each category id must be an integer." })
    categoryIds: number[];

    @IsOptional()
    @IsArray()
    @IsUrl({}, { each: true, message: "Each image URL must be valid." })
    images?: string[];

    @IsOptional()
    @IsArray()
    sizes?: number[]
}
