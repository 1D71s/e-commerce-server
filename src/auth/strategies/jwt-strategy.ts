import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import * as process from "process";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IJwtPayload } from '../interfaces/jwt-payload-user.interface';
import { SessionRepository } from 'src/sessions/repositories/session.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly sessionRepository: SessionRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: IJwtPayload) {
        const { sessionToken } = payload;
        const session = await this.sessionRepository.getOne({
            where: { token: sessionToken },
            relations: ['user'],
        });

        if (!session || session.exp < new Date()) {
            throw new UnauthorizedException("Token was not found or is not valid.");
        }

        return session.user;
    }
}