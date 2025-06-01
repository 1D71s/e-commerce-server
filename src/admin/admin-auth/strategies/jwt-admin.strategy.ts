import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import * as process from "process";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IAdminJwtPayload } from '../interfaces/admin-jwt-payload.interface';
import { AdminUserRepository } from '../../admin-users/repositories/admin-user.repository';
import { IAdminUser } from '../../admin-users/interfaces/admin-user.interface';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
    constructor(
      private readonly adminRepository: AdminUserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_ADMIN_SECRET,
        });
    }

    async validate(payload: IAdminJwtPayload): Promise<IAdminUser> {
        const { id } = payload;
        const admin = await this.adminRepository.getOne({
            where: { id },
            relations: ['role', 'role.accesses'],
        });

        if (!admin) {
            throw new UnauthorizedException("Invalid token.");
        }

        return admin;
    }
}