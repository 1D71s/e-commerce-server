import { IsEmail, IsNotEmpty } from 'class-validator';
import { ResetPasswordDto } from './reset-password.dto';

export class RegisterDto extends ResetPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}