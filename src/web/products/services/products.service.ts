import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/product.repository';
import { IProduct } from '../interfaces/product.interface';
import { GetProductsFiltersDto } from '../dtos/requests/get-products-filters.dto';
import { IGetManyPagination } from '../../orders/dtos/responses/get-many-pagination.response';

@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository,
    ) {}

    async getManyByFilters(dto: GetProductsFiltersDto): Promise<IGetManyPagination<IProduct>> {
        const [products, total] = await this.productsRepository.findManyByFilters(dto);
        return { total, data: products };
    }
}