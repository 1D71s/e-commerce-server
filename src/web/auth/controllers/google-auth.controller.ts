import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { HttpService } from "@nestjs/axios";
import { GoogleGuard } from '../guards/google-auth.guard';
import { Response } from "express";
import { UserAgent } from 'src/common/decorators/user-agent.decorator';
import { ReqGoogleUser } from '../interfaces/google-user.interface';
import { IAccessToken } from '../dto/responses/tokens.response';
import { Provider } from 'src/web/users/interfaces/enums/provider.enum';
import { UserRepository } from 'src/web/users/repositories/user.repository';

@Controller('google')
export class GoogleAuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly httpService: HttpService,
        private readonly userRepository: UserRepository
    ) { }
    
    @Get('')
    @UseGuards(GoogleGuard)
    async googleAuth() {}

    @Get('redirect')
    @UseGuards(GoogleGuard)
    googleAuthRedirect(@Req() req: ReqGoogleUser, @Res() res: Response) {
        const token = req.user.accessToken;
        return res.redirect(`${process.env.GOOGLE_SUCCESS_URL}?token=${token}`);
    }

    @Get('success-google')
    async successGoogle(@Query('token') token: string, @UserAgent() agent: string, @Res() res: Response): Promise<IAccessToken> {
        try {
            const { data } = await this.httpService.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`).toPromise();
            const checkUser = await this.userRepository.findByEmail(data.email);

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
