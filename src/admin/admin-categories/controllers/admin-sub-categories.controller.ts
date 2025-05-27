import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { IMessage } from 'src/common/dto/responses/message.response';
import { AdminSubCategoriesService } from '../services/admin-dub-categories.service';
import { CreateSubCategoryDto } from '../dtos/create-sub-category.dto';
import { ISubCategory } from 'src/categories/interfaces/sub-category.interface';
import { UpdateSubCategoryDto } from '../dtos/update-sub-category.dto';
import { JwtAuthGuard } from '../../../auth/guards/auth.guard';
import { AccessGuard } from '../../accesses/guards/access.guard';
import { EndpointAccess } from '../../accesses/guards/endpoint-access.guard';
import { Endpoint } from '../../accesses/enums/endpoint.enum';

@Controller('admin/sub-categories')
export class AdminSubCategoriesController {
    constructor(
        private readonly adminSubCategoriesService: AdminSubCategoriesService,
    ) {}

    @Post('create')
    @UseGuards(JwtAuthGuard, AccessGuard)
    @EndpointAccess(Endpoint.CREATE_SUB_CATEGORY)
    async createSubCategory(@Body() dto: CreateSubCategoryDto): Promise<ISubCategory> {
        return this.adminSubCategoriesService.createSubCategory(dto);
    }

    @Post('update')
    @UseGuards(JwtAuthGuard, AccessGuard)
    @EndpointAccess(Endpoint.UPDATE_SUB_CATEGORY)
    async updateSubCategory(@Body() dto: UpdateSubCategoryDto): Promise<ISubCategory> {
        return this.adminSubCategoriesService.updateSubCategory(dto);
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard, AccessGuard)
    @EndpointAccess(Endpoint.DELETE_SUB_CATEGORY)
    async removeSubCategory(@Param('id') id: number): Promise<IMessage> {
        return this.adminSubCategoriesService.removeSubCategory(id);
    }
}