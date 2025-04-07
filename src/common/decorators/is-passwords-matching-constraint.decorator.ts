import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { RegisterDto } from 'src/auth/dto/requests/register.dto';

@ValidatorConstraint({ name: 'IsPasswordsMatching', async: false })
export class IsPasswordsMatchingConstraint implements ValidatorConstraintInterface {
    validate(repeatPassword: string, args: ValidationArguments) {
        const obj = args.object as RegisterDto;
        return obj.password === repeatPassword;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'Passwords do not mutch';
    }
}