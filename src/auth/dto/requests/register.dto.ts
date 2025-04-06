import { IsEmail, IsNotEmpty } from 'class-validator';
import { ResetPasswordDto } from '../../../users/dtos/requests/reset-password.dto';

export class RegisterDto extends ResetPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}