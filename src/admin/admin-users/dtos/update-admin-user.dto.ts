import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength, Validate } from 'class-validator';
import { IsPasswordsMatchingConstraint } from "src/common/decorators/is-passwords-matching-constraint.decorator";

export class UpdateAdminUserDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string;

    @IsString()
    @MinLength(6)
    @Validate(IsPasswordsMatchingConstraint)
    @IsOptional()
    repeatPassword?: string;

    @IsOptional()
    @IsNumber()
    roleId?: number;
}