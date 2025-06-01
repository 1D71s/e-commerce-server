import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Endpoint } from '../enums/endpoint.enum';
import { IAdminJwtPayload } from '../../admin-auth/interfaces/admin-jwt-payload.interface';

@Injectable()
export class AccessGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const endpoint: Endpoint = this.reflector.get<Endpoint>('endpoint', context.getHandler());
        if (!endpoint) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const admin: IAdminJwtPayload = request.user;

        if (!admin || !admin.role || !admin.role.accesses) {
            throw new UnauthorizedException('Access denied');
        }

        const hasAccess = admin.role.accesses.some(access => access.endpoint === endpoint);
        if (!hasAccess) {
            throw new UnauthorizedException('Access denied');
        }

        return true;
    }
}