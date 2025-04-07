import { IsNotEmpty, IsString, MinLength, Validate } from "class-validator";
import { IsPasswordsMatchingConstraint } from "src/common/decorators/is-passwords-matching-constraint.decorator";

export class ResetPasswordDto {
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @IsString()
    @MinLength(6)
    @Validate(IsPasswordsMatchingConstraint)
    @IsNotEmpty()
    repeatPassword: string;
}