import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IAccessToken } from '../../../web/auth/dto/responses/tokens.response';
import { compareSync } from 'bcrypt';
import { AdminUserRepository } from '../../admin-users/repositories/admin-user.repository';
import { LoginAdminDto } from '../dtos/login-admin.dto';
import { AdminUserEntity } from '../../admin-users/entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { IAdminJwtPayload } from '../interfaces/admin-jwt-payload.interface';

@Injectable()
export class AdminAuthService {
    constructor(
        private readonly adminUserRepository: AdminUserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async verify(user: IAdminJwtPayload): Promise<AdminUserEntity> {
        const admin = await this.adminUserRepository.getOne({ where: { id: user.id } });

        if (!admin) {
            throw new UnauthorizedException();
        }

        return admin;
    }

    async login(dto: LoginAdminDto): Promise<IAccessToken> {
        const { email, password } = dto;
        const ERROR_MESSAGE = 'Incorrect email or password.';
        const admin = await this.adminUserRepository.getOne({ where: { email } }, true);

        if (!admin) {
            throw new UnauthorizedException(ERROR_MESSAGE)
        }

        if (!compareSync(password, admin.password)) {
            throw new UnauthorizedException(ERROR_MESSAGE);
        }

        return this.generateToken(admin);
    }

    private async generateToken(admin: AdminUserEntity): Promise<IAccessToken> {
        const tokenPayload: IAdminJwtPayload = {
            id: admin.id,
            email: admin.email,
            role: admin.role
        };

        const accessToken = this.jwtService.sign(tokenPayload);

        return { accessToken };
    }
}
