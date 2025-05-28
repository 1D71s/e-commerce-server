import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { IMessage } from 'src/common/dto/responses/message.response';
import { AdminSubCategoriesService } from '../services/admin-sub-categories.service';
import { AccessGuard } from '../../accesses/guards/access.guard';
import { EndpointAccess } from '../../accesses/guards/endpoint-access.guard';
import { Endpoint } from '../../accesses/enums/endpoint.enum';
import { ISubCategory } from 'src/web/sub-categories/interfaces/sub-category.interface';
import { JwtAuthGuard } from 'src/web/auth/guards/auth.guard';
import { CreateSubCategoryDto } from '../dtos/create-sub-category.dto';
import { UpdateSubCategoryDto } from '../dtos/update-sub-category.dto';

@Controller()
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