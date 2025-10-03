import { ProductSizeRepository } from '../../../web/products/repositories/product-size.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IProductSize } from '../../../web/products/interfaces/product-size.interface';
import { IMessage } from '../../../common/dto/responses/message.response';
import { CreateProductSizeDto } from '../dtos/create-product-size.dto';
import { In } from 'typeorm';
import { UpdateProductSizeDto } from '../dtos/update-product-size.dto';

@Injectable()
export class AdminProductSizeService {
    constructor(
        private readonly productSizeRepository: ProductSizeRepository
    ) {}

    async getProductSizes(): Promise<IProductSize[]> {
        return this.productSizeRepository.getMany({})
    }

    async createSize(dto: CreateProductSizeDto): Promise<IProductSize> {
        const size = await this.productSizeRepository.create({
            value: dto.value
        })

        return await this.productSizeRepository.save(size);
    }

    async updateSize(id: number, dto: UpdateProductSizeDto): Promise<IMessage> {
        const productSize = await this.productSizeRepository.getOne({ where: { id } });

        if (!productSize) {
            throw new NotFoundException('Product not found');
        }

        productSize.value = dto.value
        await this.productSizeRepository.save(productSize);
        return { message: 'Product size updated successfully' }
    }

    async deleteSize(ids: number[]): Promise<IMessage> {
        const sizes = await this.productSizeRepository.getMany({
            where: { id: In(ids) }, 
        })

        if (!sizes.length) {
            throw new NotFoundException('Product size not found');
        }

        Promise.allSettled(
            sizes.map(async (size) => {
                await this.productSizeRepository.delete(size);
            })
        )
        return { message: 'sizes removed' };
    }
}