import { Body, Controller, Post } from '@nestjs/common';
import { AdminAuthService } from '../services/admin-auth.service';
import { LoginAdminDto } from '../dtos/login-admin.dto';
import { IAccessToken } from '../../../web/auth/dto/responses/tokens.response';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AdminAuthController {
    constructor(private readonly adminAuthService: AdminAuthService) {}

    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @Post('login')
    async login(@Body() dto: LoginAdminDto): Promise<IAccessToken> {
        return this.adminAuthService.login(dto);
    }
}
