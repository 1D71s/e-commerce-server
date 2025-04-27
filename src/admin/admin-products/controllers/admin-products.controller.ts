import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { AdminProductsService } from '../services/admin-products.service';
import { Roles } from 'src/admin/roles/enums/roles.enum';
import { RolesGuard } from 'src/admin/roles/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/common/decorators/roles.decorator';
import { IMessage } from 'src/common/dto/responses/message.response';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Controller('admin/products')
@UseGuards(JwtAuthGuard, RolesGuard)
@Role(Roles.ADMIN, Roles.OWNER)
export class AdminProductsController {
    constructor(private readonly adminProductsService: AdminProductsService) {}

    @Delete(':id')
    async deleteProduct(@Param('id') id: number): Promise<IMessage> {
        return await this.adminProductsService.deleteProduct(id); 
    }

    @Put(':id')
    async updateProduct(@Param('id') id: number, @Body() dto: UpdateProductDto): Promise<IMessage> {
        return await this.adminProductsService.updateProduct(id, dto);
    }

    @Post()
    async createProduct(@Body() dto: CreateProductDto): Promise<IMessage> {
        return await this.adminProductsService.createProduct(dto);
    }
}
