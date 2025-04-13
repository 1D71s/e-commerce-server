import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { AdminCategoriesService } from '../services/admin-categories.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { Roles } from 'src/admin/roles/enums/roles.enum';
import { RolesGuard } from 'src/admin/roles/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/common/decorators/roles.decorator';
import { IMessage } from 'src/common/dto/responses/message.response';
import { ICategory } from 'src/categories/interfaces/category.interface';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Controller('admin-categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@Role(Roles.ADMIN, Roles.OWNER)
export class AdminCategoriesController {
    constructor(
        private readonly adminCategoriesService: AdminCategoriesService,
    ) {}

    @Post('create')
    async createCategory(@Body() dto: CreateCategoryDto): Promise<ICategory> {
        return this.adminCategoriesService.createCategory(dto);
    }

    @Post('update')
    async updateCategory(@Body() dto: UpdateCategoryDto): Promise<ICategory> {
        return this.adminCategoriesService.createCategory(dto);
    }

    @Delete('delete/:id')
    async removeCategory(@Param('id') id: number): Promise<IMessage> {
        return this.adminCategoriesService.removeCategory(id);
    }
}