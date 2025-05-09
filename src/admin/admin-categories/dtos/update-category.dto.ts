import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateCategoryDto } from "./create-category.dto";

export class UpdateCategoryDto extends CreateCategoryDto {

    @IsNumber()
    @IsNotEmpty()   
    id: number;
}