import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Endpoint } from '../enums/endpoint.enum';
import { IJwtPayload } from 'src/web/auth/interfaces/jwt-payload-user.interface';

@Injectable()
export class AccessGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const endpoint: Endpoint = this.reflector.get<Endpoint>('endpoint', context.getHandler());
        if (!endpoint) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: IJwtPayload = request.user;

        if (!user || !user.role || !user.role.accesses) {
            throw new UnauthorizedException('Access denied');
        }

        const hasAccess = user.role.accesses.some(access => access.endpoint === endpoint);
        if (!hasAccess) {
            throw new UnauthorizedException('Access denied');
        }

        return true;
    }
}
