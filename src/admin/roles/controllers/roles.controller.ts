import { Controller, Query, UseGuards } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { Patch } from '@nestjs/common';
import { ChangeRoleDto } from '../dtos/requests/change-role.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { IJwtPayload } from 'src/auth/interfaces/jwt-payload-user.interface';
import { IMessage } from 'src/common/dto/responses/message.response';
import { AccessGuard } from '../../accesses/guards/access.guard';
import { EndpointAccess } from '../../accesses/guards/endpoint-access.guard';
import { Endpoint } from '../../accesses/enums/endpoint.enum';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }
    
    @Patch('change-role')
    @UseGuards(JwtAuthGuard, AccessGuard)
    @EndpointAccess(Endpoint.CHANGE_USER_ROLE)
    async updateRole(@Query() query: ChangeRoleDto, @User() user: IJwtPayload): Promise<IMessage> {
        return await this.rolesService.updateUserRole(query, user);
    }
}