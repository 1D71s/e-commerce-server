import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Endpoint } from '../enums/endpoint.enum';
import { IJwtPayload } from 'src/web/auth/interfaces/jwt-payload-user.interface';
import { UserRepository } from 'src/web/users/repositories/user.repository';

@Injectable()
export class AccessGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly userRepository: UserRepository
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const endpoint: Endpoint = this.reflector.get<Endpoint>('endpoint', context.getHandler());
        if (!endpoint) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: IJwtPayload = request.user;

        const userWithAccesses = await this.userRepository.findById(user.id, {
            relations: ['role', 'role.accesses']
        })

        if (!userWithAccesses || !userWithAccesses.role || !userWithAccesses.role.accesses) {
            throw new UnauthorizedException('Access denied');
        }

        const hasAccess = userWithAccesses.role.accesses.some(access => access.endpoint === endpoint);
        if (!hasAccess) {
            throw new UnauthorizedException('Access denied');
        }

        return true;
    }
}
