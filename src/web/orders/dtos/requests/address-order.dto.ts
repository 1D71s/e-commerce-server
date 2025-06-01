import { IsEnum, IsNotEmpty, IsOptional, IsString, IsPostalCode } from 'class-validator';
import { DeliveryProvider } from '../../enums/delivery-provider.enum';

export class AddressOrderDto {
    @IsEnum(DeliveryProvider)
    deliveryProvider: DeliveryProvider;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsOptional()
    @IsPostalCode('any')
    zipCode?: string;

    @IsOptional()
    @IsString()
    message?: string;
}
