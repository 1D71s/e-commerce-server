import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { Patch } from '@nestjs/common';
import { IMessage } from 'src/common/dto/responses/message.response';
import { AccessGuard } from '../../accesses/guards/access.guard';
import { EndpointAccess } from '../../accesses/guards/endpoint-access.guard';
import { Endpoint } from '../../accesses/enums/endpoint.enum';
import { IRole } from '../interfaces/role.interface';
import { CreateRoleDto } from '../dtos/requests/create-role.dto';
import { UpdateRoleDto } from '../dtos/requests/update-role.dto';
import { JwtAuthAdminGuard } from '../../admin-auth/guards/auth.admin.guard';

@Controller()
@UseGuards(JwtAuthAdminGuard, AccessGuard)
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Get()
    @EndpointAccess(Endpoint.GET_ROLES)
    async getAllRoles(): Promise<IRole[]> {
        return this.rolesService.getAllRoles();
    }

    @Post('create')
    @EndpointAccess(Endpoint.CREATE_ROLE)
    async createRole(@Body() dto: CreateRoleDto): Promise<IMessage> {
        return this.rolesService.createRole(dto);
    }

    @Patch('update/:id')
    @EndpointAccess(Endpoint.UPDATE_ROLE)
    async updateRole(@Param('id') id: number, @Body() dto: UpdateRoleDto): Promise<IMessage> {
        return this.rolesService.updateRole(dto, id)
    }
}