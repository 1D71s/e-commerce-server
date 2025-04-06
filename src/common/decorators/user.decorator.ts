import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { JwtPayloadUserInterface } from 'src/auth/interfaces/jwt-payload-user.interface';

export const User = createParamDecorator(
    (key: keyof JwtPayloadUserInterface, ctx: ExecutionContext): JwtPayloadUserInterface | Partial<JwtPayloadUserInterface> => {
        const request = ctx.switchToHttp().getRequest();
        return key ? request.user[key] : request.user;
    },
);