import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import * as process from "process";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from 'src/users/services/users.service';
import { JwtPayloadUserInterface } from '../interfaces/jwt-payload-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: JwtPayloadUserInterface) {
        const user = await this.userService.getOneById(payload.id)

        if (!user) {
            throw new UnauthorizedException("Access denied. User account not found.");
        }

        if (!user.tokens.some(session => session.token === payload.session)) {
            throw new UnauthorizedException("Session does not exist.");
        }

        return user
    }
}