import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IAccessToken } from '../../../web/auth/dto/responses/tokens.response';
import { compareSync } from 'bcrypt';
import { AdminRepository } from '../../admins/repositories/admin.repository';
import { LoginAdminDto } from '../dtos/login-admin.dto';
import { AdminEntity } from '../../admins/entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { IAdminJwtPayload } from '../interfaces/admin-jwt-payload.interface';

@Injectable()
export class AdminAuthService {
    constructor(
        private readonly adminRepository: AdminRepository,
        private readonly jwtService: JwtService,
    ) {}

    async login(dto: LoginAdminDto): Promise<IAccessToken> {
        const { email, password } = dto;
        const ERROR_MESSAGE = 'Incorrect email or password.';
        const admin = await this.adminRepository.getOne({ where: { email } }, true);

        if (!admin) {
            throw new NotFoundException(ERROR_MESSAGE)
        }

        if (!compareSync(password, admin.password)) {
            throw new UnauthorizedException(ERROR_MESSAGE);
        }

        return this.generateToken(admin);
    }

    private async generateToken(admin: AdminEntity): Promise<IAccessToken> {
        const tokenPayload: IAdminJwtPayload = {
            id: admin.id,
            email: admin.email,
            role: admin.role
        };

        const accessToken = this.jwtService.sign(tokenPayload);

        return { accessToken };
    }
}
