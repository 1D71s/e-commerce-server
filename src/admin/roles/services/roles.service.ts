import { Injectable } from '@nestjs/common';
import { ChangeRoleDto } from '../dtos/requests/change-role.dto';
import { IMessage } from 'src/common/dto/responses/message.response';
import { UserRepository } from 'src/web/users/repositories/user.repository';
import { IJwtPayload } from 'src/web/auth/interfaces/jwt-payload-user.interface';

@Injectable()
export class RolesService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async updateUserRole(query: ChangeRoleDto, user: IJwtPayload): Promise<IMessage> {
        return { message: 'Role updated' };
    }
}
