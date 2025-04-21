import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Post, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response } from "express";
import { UserAgent } from 'src/common/decorators/user-agent.decorator';
import { RegisterDto } from '../dto/requests/register.dto';
import { LoginDto } from '../dto/requests/login.dto';
import { Cookie } from 'src/common/decorators/cookie.decorator';
import { JwtAuthGuard } from '../guards/auth.guard';
import { Throttle } from '@nestjs/throttler';
import { IMessage } from 'src/common/dto/responses/message.response';
import { REFRESH_TOKEN } from 'src/common/variables';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('register')
    @Throttle({ default: { limit: 1, ttl: 3600000 } })
    async register(@Body() dto: RegisterDto): Promise<IMessage> {
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

    @Delete('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response, @UserAgent() agent: string): Promise<void> {
        if (!refreshToken) {
            res.sendStatus(HttpStatus.OK);
            return;
        }
        await this.authService.deleteRefreshToken(refreshToken, agent);
        res.cookie(REFRESH_TOKEN, '', { httpOnly: true, secure: true, expires: new Date() });
        res.sendStatus(HttpStatus.OK);
    }

    @Get('tokens/update')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    async refreshTokens(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response, @UserAgent() agent: string): Promise<void> {
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