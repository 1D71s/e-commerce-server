import { ProductSizeRepository } from '../../../web/products/repositories/product-size.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IProductSize } from '../../../web/products/interfaces/product-size.interface';
import { IMessage } from '../../../common/dto/responses/message.response';
import { CreateProductSizeDto } from '../dtos/create-product-size.dto';

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

    async deleteSize(sizeId: number): Promise<IMessage> {
        const size = await this.productSizeRepository.getOne({
            where: { id: sizeId },
        })

        if (!size) {
            throw new NotFoundException('Product size not found');
        }

        await this.productSizeRepository.delete(size);
        return { message: 'size removed' };
    }
}