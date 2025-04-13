import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateCategoryDto } from "./create-category.dto";

export class UpdateSubCategoryDto extends CreateCategoryDto {

    @IsNumber()
    @IsNotEmpty()   
    id: number;
}