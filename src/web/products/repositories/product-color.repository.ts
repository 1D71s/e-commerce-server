import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductColorEntity } from '../entities/product-color.entity';
import { ProductPropertyEntity } from '../entities/product-property.entity';
import { IProductColor } from '../interfaces/product-color.interface';

@Injectable()
export class ProductColorRepository {
    constructor(
        @InjectRepository(ProductColorEntity)
        private readonly colorRepo: Repository<ProductColorEntity>,
    ) {}

    async createColor(value: string, productProperty: ProductPropertyEntity): Promise<IProductColor> {
        const color = this.colorRepo.create({
            value,
            productProperty,
        });

        return await this.colorRepo.save(color);
    }
}
