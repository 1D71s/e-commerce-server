import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
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

@Controller()
export class AdminProductsController {
    constructor(private readonly adminProductsService: AdminProductsService) {}

    @Delete(':id')
    @UseGuards(JwtAuthAdminGuard, AccessGuard)
    @EndpointAccess(Endpoint.DELETE_PRODUCT)
    async deleteProduct(@Param('id') id: number): Promise<IMessage> {
        return await this.adminProductsService.deleteProduct(id); 
    }

    @Put(':id')
    @UseGuards(JwtAuthAdminGuard, AccessGuard)
    @EndpointAccess(Endpoint.UPDATE_PRODUCT)
    async updateProduct(@Param('id') id: number, @Body() dto: UpdateProductDto): Promise<IMessage> {
        return await this.adminProductsService.updateProduct(id, dto);
    }

    @Post()
    @UseGuards(JwtAuthAdminGuard, AccessGuard)
    @EndpointAccess(Endpoint.CREATE_PRODUCT)
    async createProduct(@Body() dto: CreateProductDto, @User() user: IAdminJwtPayload): Promise<IMessage> {
        return await this.adminProductsService.createProduct(dto, user.id);
    }
}
