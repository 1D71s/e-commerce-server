import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminUsersService } from '../services/admin-users.service';
import { JwtAuthAdminGuard } from '../../admin-auth/guards/auth.admin.guard';
import { AccessGuard } from '../../accesses/guards/access.guard';
import { EndpointAccess } from '../../accesses/guards/endpoint-access.guard';
import { Endpoint } from '../../accesses/enums/endpoint.enum';
import { IAdminUser } from '../interfaces/admin-user.interface';
import { IMessage } from '../../../common/dto/responses/message.response';
import { CreateAdminUserDto } from '../dtos/create-admin-user.dto';
import { UpdateAdminUserDto } from '../dtos/update-admin-user.dto';

@Controller()
@UseGuards(JwtAuthAdminGuard, AccessGuard)
export class AdminUsersController {
    constructor(private readonly adminUsersService: AdminUsersService) {}

    @Get()
    @EndpointAccess(Endpoint.GET_ADMINS)
    async getAll(): Promise<IAdminUser[]> {
        return this.adminUsersService.getAll();
    }

    @Post('create')
    @EndpointAccess(Endpoint.CREATE_ADMIN)
    async create(@Body() dto: CreateAdminUserDto): Promise<IMessage> {
        return this.adminUsersService.createAdminUser(dto);
    }

    @Patch('update/:id')
    @EndpointAccess(Endpoint.UPDATE_ADMIN)
    async update(@Param('id') id: number, @Body() dto: UpdateAdminUserDto): Promise<IMessage> {
        return this.adminUsersService.updateAdminUser(dto, id);
    }

    @Delete('delete/:id')
    @EndpointAccess(Endpoint.DELETE_ADMIN)
    async delete(@Param('id') id: number): Promise<IMessage> {
        return this.adminUsersService.deleteAdminUser(id);
    }
}
