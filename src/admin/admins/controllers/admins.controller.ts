import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminsService } from '../services/admins.service';
import { JwtAuthAdminGuard } from '../../admin-auth/guards/auth.admin.guard';
import { AccessGuard } from '../../accesses/guards/access.guard';
import { EndpointAccess } from '../../accesses/guards/endpoint-access.guard';
import { Endpoint } from '../../accesses/enums/endpoint.enum';
import { IAdmin } from '../interfaces/admin.interface';
import { IMessage } from '../../../common/dto/responses/message.response';
import { CreateAdminDto } from '../dtos/create-admin.dto';
import { UpdateAdminDto } from '../dtos/update-admin.dto';

@Controller()
export class AdminsController {
    constructor(private readonly adminsService: AdminsService) {}

    @Get()
    @UseGuards(JwtAuthAdminGuard, AccessGuard)
    @EndpointAccess(Endpoint.GET_ADMINS)
    async getAll(): Promise<IAdmin[]> {
        return this.adminsService.getAll();
    }

    @Post('create')
    @UseGuards(JwtAuthAdminGuard, AccessGuard)
    @EndpointAccess(Endpoint.CREATE_ADMIN)
    async create(@Body() dto: CreateAdminDto): Promise<IMessage> {
        return this.adminsService.createAdmin(dto);
    }

    @Patch('update/:id')
    @UseGuards(JwtAuthAdminGuard, AccessGuard)
    @EndpointAccess(Endpoint.UPDATE_ADMIN)
    async update(@Param('id') id: number, @Body() dto: UpdateAdminDto): Promise<IMessage> {
        return this.adminsService.updateAdmin(dto, id);
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthAdminGuard, AccessGuard)
    @EndpointAccess(Endpoint.DELETE_ADMIN)
    async delete(@Param('id') id: number): Promise<IMessage> {
        return this.adminsService.deleteAdmin(id);
    }
}
