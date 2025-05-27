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

    async updateRole(query: ChangeRoleDto, user: IJwtPayload): Promise<IMessage> {
        // const { userId, newRole } = query;
        // const checkAccess = this.checkRoleHierarchy(user.role ,newRole);
        //
        // if (!checkAccess) {
        //     throw new ForbiddenException('Access denied');
        // }
        //
        // const userForNewRole = await this.userRepository.findById(userId)
        //
        // if (!userForNewRole) {
        //     throw new NotFoundException('Access denied');
        // }
        //
        // const updateUser = this.userRepository.merge(userForNewRole, {
        //     role: newRole,
        // });
        //
        // const savedUser = await this.userRepository.save(updateUser);
        //
        // if (!savedUser) {
        //     throw new BadRequestException('Role not updated');
        // }

        return { message: 'Role updated' };
    }

    public checkRoleHierarchy(userRole: string, requiredRole: string): void {
        // const { OWNER, ADMIN, MANAGER, CUSTOMER } = Roles;
        // const hierarchy: Record<string, string[]> = {
        //     [OWNER]: [ADMIN, MANAGER, CUSTOMER],
        //     [ADMIN]: [MANAGER, CUSTOMER],
        //     [MANAGER]: [CUSTOMER],
        //     [CUSTOMER]: [],
        // };
        //
        // const allowedRoles = hierarchy[userRole];
        // return allowedRoles ? allowedRoles.includes(requiredRole) : false;
    }
}
