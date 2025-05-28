import { IsNotEmpty, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class ChangeRoleDto {

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    newRoleId: number;
}