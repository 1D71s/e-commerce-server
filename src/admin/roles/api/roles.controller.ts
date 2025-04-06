import { Controller, Query, UseGuards } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { Patch } from '@nestjs/common';
import { ChangeRoleDto } from '../dtos/requests/change-role.dto';
import { Role } from 'src/common/decorators/roles.decorator';
import { Roles } from '../enums/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { User } from 'src/common/decorators/user.decorator';
import { JwtPayloadUserInterface } from 'src/auth/interfaces/jwt-payload-user.interface';
import { MessageInterface } from 'src/common/dto/responses/message.response';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Role(Roles.ADMIN, Roles.OWNER)
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }
    
    @Patch('change-role')
    async updateRole(@Query() query: ChangeRoleDto, @User() user: JwtPayloadUserInterface): Promise<MessageInterface> {
        return await this.rolesService.updateRole(query, user);
    }
}