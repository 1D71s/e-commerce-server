import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { IJwtPayload } from 'src/web/auth/interfaces/jwt-payload-user.interface';

export const User = createParamDecorator(
    (key: keyof IJwtPayload, ctx: ExecutionContext): IJwtPayload | Partial<IJwtPayload> => {
        const request = ctx.switchToHttp().getRequest();
        return key ? request.user[key] : request.user;
    },
);