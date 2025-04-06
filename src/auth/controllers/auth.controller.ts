import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { HttpService } from "@nestjs/axios";
import { GoogleGuard } from '../guards/google-auth.guard';
import { Response } from "express";
import { UserAgent } from 'src/common/decorators/user-agent.decorator';
import { ReqGoogleUser } from '../interfaces/google-user.interface';
import { RegisterDto } from '../dto/requests/register.dto';
import { Provider } from 'src/users/entities/enums/provider.enum';
import { AccessToken } from '../dto/responses/tokens.response';
import { LoginDto } from '../dto/requests/login.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { Cookie } from 'src/common/decorators/cookie.decorator';
import { JwtAuthGuard } from '../guards/auth.guard';
import { TokenEntity } from '../../sessions/entities/token.entity';
import { Throttle } from '@nestjs/throttler';
import { UserRepository } from 'src/users/repositories/user.repository';
import { REFRESH_TOKEN } from '../variables';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly httpService: HttpService,
        private readonly UserRepository: UserRepository
    ) { }

    @Post('register')
    @Throttle({ default: { limit: 1, ttl: 3600000 } })
    async register(@Body() dto: RegisterDto): Promise<UserEntity> {
        return this.authService.register(dto);
    }

    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @Post('login')
    async login(@Body() dto: LoginDto, @Res() res: Response, @UserAgent() agent: string): Promise<void> {
        const tokens = await this.authService.login(dto, agent);

        if (!tokens) {
            throw new BadRequestException(`Invalid data: ${JSON.stringify(dto)}`);
        }

        await this.authService.sendRefreshTokenToCookies(tokens, res);
        res.json({ accessToken: tokens.accessToken });
    }

    @Get('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Cookie(REFRESH_TOKEN) refreshToken: TokenEntity, @Res() res: Response): Promise<void> {
        if (!refreshToken) {
            res.sendStatus(HttpStatus.OK);
            return;
        }
        await this.authService.deleteRefreshToken(refreshToken);
        res.cookie(REFRESH_TOKEN, '', { httpOnly: true, secure: true, expires: new Date() });
        res.sendStatus(HttpStatus.OK);
    }

    @Get('refresh-tokens')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    async refreshTokens(@Cookie(REFRESH_TOKEN) refreshToken: TokenEntity, @Res() res: Response, @UserAgent() agent: string): Promise<void> {
        if (!refreshToken) {
            throw new UnauthorizedException();
        }
        const tokens = await this.authService.updateRefreshTokens(refreshToken, agent);
        if (!tokens) {
            throw new UnauthorizedException();
        }
        this.authService.sendRefreshTokenToCookies(tokens, res);
        res.json({ accessToken: tokens.accessToken });
    }
}
