import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { Patch } from '@nestjs/common';
import { ChangeRoleDto } from '../dtos/requests/change-role.dto';
import { User } from 'src/common/decorators/user.decorator';
import { IMessage } from 'src/common/dto/responses/message.response';
import { AccessGuard } from '../../accesses/guards/access.guard';
import { EndpointAccess } from '../../accesses/guards/endpoint-access.guard';
import { Endpoint } from '../../accesses/enums/endpoint.enum';
import { JwtAuthGuard } from 'src/web/auth/guards/auth.guard';
import { IJwtPayload } from 'src/web/auth/interfaces/jwt-payload-user.interface';

@Controller()
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Post('create')
    @UseGuards(JwtAuthGuard, AccessGuard)
    @EndpointAccess(Endpoint.CREATE_ROLE)
    async createRole() {}

    @Post('update')
    @UseGuards(JwtAuthGuard, AccessGuard)
    @EndpointAccess(Endpoint.UPDATE_ROLE)
    async updateRole() {}
    
    @Patch('change-role')
    @UseGuards(JwtAuthGuard, AccessGuard)
    @EndpointAccess(Endpoint.CHANGE_USER_ROLE)
    async updateUserRole(@Query() query: ChangeRoleDto, @User() user: IJwtPayload): Promise<IMessage> {
        return await this.rolesService.updateUserRole(query, user);
    }
}