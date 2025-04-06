import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { Roles } from "../../enums/roles.enum";
import { Type } from "class-transformer";

export class ChangeRoleDto {
    @IsNumber()
    @Type(() => Number)
    userId: number;

    @IsNotEmpty()
    @IsEnum(Roles)
    newRole: Roles;
}