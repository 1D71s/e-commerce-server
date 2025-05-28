import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { AdminCategoriesService } from '../services/admin-categories.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { IMessage } from 'src/common/dto/responses/message.response';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { AccessGuard } from '../../accesses/guards/access.guard';
import { EndpointAccess } from '../../accesses/guards/endpoint-access.guard';
import { Endpoint } from '../../accesses/enums/endpoint.enum';
import { JwtAuthGuard } from 'src/web/auth/guards/auth.guard';
import { ICategory } from 'src/web/categories/interfaces/category.interface';

@Controller()
export class AdminCategoriesController {
    constructor(
        private readonly adminCategoriesService: AdminCategoriesService,
    ) {}

    @Post('create')
    @UseGuards(JwtAuthGuard, AccessGuard)
    @EndpointAccess(Endpoint.CREATE_CATEGORY)
    async createCategory(@Body() dto: CreateCategoryDto): Promise<ICategory> {
        return this.adminCategoriesService.createCategory(dto);
    }

    @Post('update')
    @UseGuards(JwtAuthGuard, AccessGuard)
    @EndpointAccess(Endpoint.UPDATE_CATEGORY)
    async updateCategory(@Body() dto: UpdateCategoryDto): Promise<ICategory> {
        return this.adminCategoriesService.updateCategory(dto);
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard, AccessGuard)
    @EndpointAccess(Endpoint.DELETE_CATEGORY)
    async removeCategory(@Param('id') id: number): Promise<IMessage> {
        return this.adminCategoriesService.removeCategory(id);
    }
}