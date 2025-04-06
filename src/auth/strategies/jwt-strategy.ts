import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import * as process from "process";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayloadUserInterface } from '../interfaces/jwt-payload-user.interface';
import { UserRepository } from 'src/users/repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: JwtPayloadUserInterface) {
        const user = await this.userRepository.findOne({
            where: { id: payload.id },
            relations: ['tokens']
        });

        if (!user) {
            throw new UnauthorizedException("Access denied. User account not found.");
        }

        if (!user.tokens.some(session => session.token === payload.session)) {
            throw new UnauthorizedException("Session does not exist.");
        }

        return user
    }
}