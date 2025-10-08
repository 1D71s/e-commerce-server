import { IsArray, IsNotEmpty } from "class-validator";

export class AddProductImagesDto {
    @IsNotEmpty()
    @IsArray()
    imagePaths: string[]; 
}
