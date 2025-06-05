import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { IProduct } from '../interfaces/product.interface';
import { GetProductsFiltersDto } from '../dtos/requests/get-products-filters.dto';
import { IGetManyPagination } from '../../orders/dtos/responses/get-many-pagination.response';

@Controller()
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getManyByFilters(@Query() dto: GetProductsFiltersDto): Promise<IGetManyPagination<IProduct>>  {
        return this.productsService.getManyByFilters(dto);
    }
}