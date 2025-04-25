import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { IProduct } from '../interfaces/product.interface';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get(":sub_category")
    async getAllBySubCategory(@Param("sub_category") subCategoryId: number): Promise<IProduct[]> {
        return await this.productsService.getAllBySubCategory(subCategoryId);
    }
}