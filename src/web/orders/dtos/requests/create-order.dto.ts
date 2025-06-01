import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { PaymentMethod } from '../../enums/payment-method.enum';
import { AddressOrderDto } from './address-order.dto';
import { QuantitiesOrderDto } from './quantities-order.dto';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber(null)
    phone: string;

    @IsOptional()
    @IsString()
    message?: string;

    @IsOptional()
    @IsEnum(PaymentMethod)
    paymentMethod?: PaymentMethod;

    @IsArray()
    @IsNotEmpty()
    quantities: QuantitiesOrderDto[];

    @IsNotEmpty()
    address: AddressOrderDto;
}
