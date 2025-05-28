import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/product.repository';
import { IProduct } from '../interfaces/product.interface';

@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository,
    ) {}

    async getAllBySubCategory(subCategoryId: number): Promise<IProduct[]> {
        return await this.productsRepository.getMany({
            where: {
                subCategory: {
                    id: subCategoryId
                }
            }
        });
    }
}
