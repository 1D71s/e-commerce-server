import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateCategoryDto } from "src/admin/admin-categories/dtos/create-category.dto";

export class UpdateSubCategoryDto extends CreateCategoryDto {

    @IsNumber()
    @IsNotEmpty()   
    id: number;
}