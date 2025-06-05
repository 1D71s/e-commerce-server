import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { AdminCategoriesService } from '../services/admin-categories.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { IMessage } from 'src/common/dto/responses/message.response';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { AccessGuard } from '../../accesses/guards/access.guard';
import { EndpointAccess } from '../../accesses/guards/endpoint-access.guard';
import { Endpoint } from '../../accesses/enums/endpoint.enum';
import { ICategory } from 'src/web/categories/interfaces/category.interface';
import { JwtAuthAdminGuard } from '../../admin-auth/guards/auth.admin.guard';

@Controller()
@UseGuards(JwtAuthAdminGuard, AccessGuard)
export class AdminCategoriesController {
    constructor(
        private readonly adminCategoriesService: AdminCategoriesService,
    ) {}

    @Post('create')
    @EndpointAccess(Endpoint.CREATE_CATEGORY)
    async createCategory(@Body() dto: CreateCategoryDto): Promise<ICategory> {
        return this.adminCategoriesService.createCategory(dto);
    }

    @Post('update')
    @EndpointAccess(Endpoint.UPDATE_CATEGORY)
    async updateCategory(@Body() dto: UpdateCategoryDto): Promise<ICategory> {
        return this.adminCategoriesService.updateCategory(dto);
    }

    @Delete('delete/:id')
    @EndpointAccess(Endpoint.DELETE_CATEGORY)
    async removeCategory(@Param('id') id: number): Promise<IMessage> {
        return this.adminCategoriesService.removeCategory(id);
    }
}