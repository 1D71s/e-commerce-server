import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Roles } from '../enums/roles.enum';
import { ChangeRoleDto } from '../dtos/requests/change-role.dto';
import { IJwtPayload } from 'src/auth/interfaces/jwt-payload-user.interface';
import { IMessage } from 'src/common/dto/responses/message.response';
import { UserRepository } from 'src/users/repositories/user.repository';

@Injectable()
export class RolesService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async updateUserRole(query: ChangeRoleDto, user: IJwtPayload): Promise<IMessage> {
        return { message: 'Role updated' };
    }

    public checkRoleHierarchy(userRole: string, requiredRole: string): void {}
}
