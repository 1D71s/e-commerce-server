import { IsArray, ArrayNotEmpty, IsInt, ArrayMinSize, ArrayUnique } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteSizesDto {
    @IsArray()
    @ArrayNotEmpty({ message: 'Массив ID не может быть пустым' })
    @ArrayUnique({ message: 'ID должны быть уникальными' })
    @Type(() => Number)
    @IsInt({ each: true, message: 'Каждый ID должен быть числом' })
    ids: number[];
}
