import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/admin/roles/enums/roles.enum';
import { RolesGuard } from 'src/admin/roles/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/common/decorators/roles.decorator';
import { IMessage } from 'src/common/dto/responses/message.response';
import { AdminSubCategoriesService } from '../services/admin-dub-categories.service';
import { CreateSubCategoryDto } from '../dtos/create-sub-category.dto';
import { ISubCategory } from 'src/categories/interfaces/sub-category.interface';
import { UpdateSubCategoryDto } from '../dtos/update-sub-category.dto';

@Controller('admin/sub-categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@Role(Roles.ADMIN, Roles.OWNER)
export class AdminSubCategoriesController {
    constructor(
        private readonly adminSubCategoriesService: AdminSubCategoriesService,
    ) {}

    @Post('create')
    async createSubCategory(@Body() dto: CreateSubCategoryDto): Promise<ISubCategory> {
        return this.adminSubCategoriesService.createSubCategory(dto);
    }

    @Post('update')
    async updateSubCategory(@Body() dto: UpdateSubCategoryDto): Promise<ISubCategory> {
        return this.adminSubCategoriesService.updateSubCategory(dto);
    }

    @Delete('delete/:id')
    async removeSubCategory(@Param('id') id: number): Promise<IMessage> {
        return this.adminSubCategoriesService.removeSubCategory(id);
    }
}