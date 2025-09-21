import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminAuthService } from '../services/admin-auth.service';
import { LoginAdminDto } from '../dtos/login-admin.dto';
import { IAccessToken } from '../../../web/auth/dto/responses/tokens.response';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthAdminGuard } from '../guards/auth.admin.guard';
import { User } from 'src/common/decorators/user.decorator';
import { IAdminJwtPayload } from '../interfaces/admin-jwt-payload.interface';
import { AdminUserEntity } from 'src/admin/admin-users/entities/admin.entity';

@Controller()
export class AdminAuthController {
    constructor(private readonly adminAuthService: AdminAuthService) {}

    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @Post('login')
    async login(@Body() dto: LoginAdminDto): Promise<IAccessToken> {
        return this.adminAuthService.login(dto);
    }

    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @UseGuards(JwtAuthAdminGuard)
    @Get('verify')
    async verify(@User() user: IAdminJwtPayload): Promise<AdminUserEntity>  {
        return this.adminAuthService.verify(user);
    }
}
