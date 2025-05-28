import { IsString, IsArray, IsNumber } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsArray()
  @IsNumber({}, { each: true }) 
  accesses: number[];
}