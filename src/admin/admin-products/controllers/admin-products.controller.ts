import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
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

@Controller()
@UseGuards(JwtAuthAdminGuard, AccessGuard)
export class AdminProductsController {
    constructor(
        private readonly adminProductsService: AdminProductsService,
        private readonly adminProductSizeService: AdminProductSizeService
    ) {}

    @Delete(':id')
    @EndpointAccess(Endpoint.DELETE_PRODUCT)
    async deleteProduct(@Param('id') id: number): Promise<IMessage> {
        return await this.adminProductsService.deleteProduct(id); 
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
    @EndpointAccess(Endpoint.GET_PRODUCT_SIZES)
    async getAllSizes(): Promise<IProductSize[]> {
        return this.adminProductSizeService.getProductSizes();
    }

    @Post('size/create')
    @EndpointAccess(Endpoint.CREATE_PRODUCT_SIZE)
    async createProductSize(@Body() dto: CreateProductSizeDto): Promise<IProductSize> {
        return this.adminProductSizeService.createSize(dto)
    }

    @Delete('size/:id')
    @EndpointAccess(Endpoint.DELETE_PRODUCT_SIZE)
    async deleteProductSize(@Param('id') id: number): Promise<IMessage> {
        return await this.adminProductSizeService.deleteSize(id);
    }
}
