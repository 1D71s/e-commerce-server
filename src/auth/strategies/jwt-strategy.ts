import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import * as process from "process";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IJwtPayload } from '../interfaces/jwt-payload-user.interface';
import { SessionRepository } from 'src/sessions/repositories/session.repository';
import { SessionsService } from 'src/sessions/services/sessions.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly sessionService: SessionsService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: IJwtPayload) {
        const userAgent = req.headers['user-agent'];
        const { sessionToken, id } = payload;
        
        const session = await this.sessionService.validateSession(id, sessionToken, userAgent);

        if (!session || session.exp < new Date()) {
            throw new UnauthorizedException("Token was not found or is not valid.");
        }

        return session.user;
    }
}