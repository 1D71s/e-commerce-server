import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { HttpService } from "@nestjs/axios";
import { GoogleGuard } from '../guards/google-auth.guard';
import { Response } from "express";
import { UserAgent } from 'src/common/decorators/user-agent.decorator';
import { ReqGoogleUser } from '../interfaces/google-user.interface';
import { RegisterDto } from '../dto/requests/register.dto';
import { UsersService } from 'src/users/services/users.service';
import { Provider } from 'src/users/entities/enums/provider.enum';
import { AccessToken } from '../dto/responses/tokens.response';
import { LoginDto } from '../dto/requests/login.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { Cookie } from 'src/common/decorators/cookie.decorator';
import { JwtAuthGuard } from '../guards/auth.guard';
import { TokenEntity } from '../../sessions/entities/token.entity';
import { Throttle } from '@nestjs/throttler';
import { MessageInterface } from 'src/common/dto/responses/message.response';
import { ResetPasswordDto } from '../dto/requests/reset-password.dto';

const REFRESH_TOKEN = 'REFRESH_TOKEN';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly httpService: HttpService,
        private readonly usersService: UsersService
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

    @Get('send/password/code/:email')
    @Throttle({ default: { limit: 3, ttl: 3600000 } })
    async sendPasswordUpdateEmail(@Param('email') email: string, @UserAgent() agent: string): Promise<MessageInterface> {
        return this.authService.sendPasswordUpdateEmail(email, agent);
    }

    @Post('reset/password/:token')
    @Throttle({ default: { limit: 1, ttl: 3600000 } })
    async changePassword(@Param('token') token: string, @Body() dto: ResetPasswordDto): Promise<MessageInterface> {
        return this.authService.changePassword(token, dto.password);
    }

    @Get('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Cookie('REFRESH_TOKEN') refreshToken: TokenEntity, @Res() res: Response): Promise<void> {
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
    
    @Get('google')
    @UseGuards(GoogleGuard)
    async googleAuth() {}

    @Get('google/redirect')
    @UseGuards(GoogleGuard)
    googleAuthRedirect(@Req() req: ReqGoogleUser, @Res() res: Response) {
        const token = req.user.accessToken;
        
        return res.redirect(`${process.env.THIS_URL}/auth/success-google?token=${token}`);
    }

    @Get('success-google')
    async successGoogle(@Query('token') token: string, @UserAgent() agent: string, @Res() res: Response): Promise<AccessToken> {
        try {
            const { data } = await this.httpService.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`).toPromise();
            const checkUser = await this.usersService.getOneByEmail(data.email);

            if (checkUser && checkUser.provider !== Provider.GOOGLE) {
                res.json({ message: 'this email is used without googleAuth!', success: false });
                return;
            }

            const tokens = await this.authService.googleAuth(data, agent);
            await this.authService.sendRefreshTokenToCookies(tokens, res);
            res.json({ accessToken: tokens.accessToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
