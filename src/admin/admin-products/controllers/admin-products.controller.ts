import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { AdminProductsService } from '../services/admin-products.service';
import { IMessage } from 'src/common/dto/responses/message.response';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { AccessGuard } from '../../accesses/guards/access.guard';
import { EndpointAccess } from '../../accesses/guards/endpoint-access.guard';
import { Endpoint } from '../../accesses/enums/endpoint.enum';
import { User } from '../../../common/decorators/user.decorator';
import { JwtAuthAdminGuard } from '../../admin-auth/guards/auth.admin.guard';
import { IAdminJwtPayload } from '../../admin-auth/interfaces/admin-jwt-payload.interface';
import { AdminProductSizeService } from '../services/admin-product-size.service';
import { IProductSize } from '../../../web/products/interfaces/product-size.interface';
import { CreateProductSizeDto } from '../dtos/create-product-size.dto';
import { IGetManyPagination } from 'src/common/dto/responses/get-many-pagination.response';
import { GetProductsFiltersDto } from 'src/web/products/dtos/requests/get-products-filters.dto';
import { IProduct } from 'src/web/products/interfaces/product.interface';
import { DeleteProductsDto } from '../dtos/delete-products.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { DeleteSizesDto } from '../dtos/delete-sizes.dto';
import { UpdateProductSizeDto } from '../dtos/update-product-size.dto';

@Controller()
@UseGuards(JwtAuthAdminGuard, AccessGuard)
export class AdminProductsController {
    constructor(
        private readonly adminProductsService: AdminProductsService,
        private readonly adminProductSizeService: AdminProductSizeService
    ) {}

    @Get()
    @SkipThrottle()
    async getManyByFilters(@Query() dto: GetProductsFiltersDto): Promise<IGetManyPagination<IProduct>>  {
        return this.adminProductsService.getManyByFilters(dto);
    }

    @Delete()
    @EndpointAccess(Endpoint.DELETE_PRODUCT)
    async deleteProducts(@Body() dto: DeleteProductsDto): Promise<IMessage> {
        return this.adminProductsService.deleteProducts(dto.ids);
    }

    @Put(':id')
    @EndpointAccess(Endpoint.UPDATE_PRODUCT)
    async updateProduct(@Param('id') id: number, @Body() dto: UpdateProductDto): Promise<IMessage> {
        return await this.adminProductsService.updateProduct(id, dto);
    }

    @Post()
    @EndpointAccess(Endpoint.CREATE_PRODUCT)
    async createProduct(@Body() dto: CreateProductDto, @User() user: IAdminJwtPayload): Promise<IMessage> {
        return await this.adminProductsService.createProduct(dto, user.id);
    }

    @Get('sizes')
    @SkipThrottle()
    @EndpointAccess(Endpoint.GET_PRODUCT_SIZES)
    async getAllSizes(): Promise<IProductSize[]> {
        return this.adminProductSizeService.getProductSizes();
    }

    @Post('size/create')
    @EndpointAccess(Endpoint.CREATE_PRODUCT_SIZE)
    async createProductSize(@Body() dto: CreateProductSizeDto): Promise<IProductSize> {
        return this.adminProductSizeService.createSize(dto)
    }

    @Delete('size')
    @EndpointAccess(Endpoint.DELETE_PRODUCT_SIZE)
    async deleteProductSize(@Body() dto: DeleteSizesDto): Promise<IMessage> {
        return await this.adminProductSizeService.deleteSize(dto.ids);
    }

    @Put('size/:id')
    @EndpointAccess(Endpoint.UPDATE_PRODUCT_SIZE)
    async updateProductSize(@Param('id') id: number, @Body() dto: UpdateProductSizeDto): Promise<IMessage> {
        return await this.adminProductSizeService.updateSize(id, dto);
    }
}