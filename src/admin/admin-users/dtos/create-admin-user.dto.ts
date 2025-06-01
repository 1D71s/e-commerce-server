import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength, Validate } from 'class-validator';
import { IsPasswordsMatchingConstraint } from "src/common/decorators/is-passwords-matching-constraint.decorator";

export class CreateAdminUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @IsString()
    @MinLength(6)
    @Validate(IsPasswordsMatchingConstraint)
    @IsNotEmpty()
    repeatPassword: string;

    @IsNotEmpty()
    @IsNumber()
    roleId: number;
}