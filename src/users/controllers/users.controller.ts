import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Throttle } from '@nestjs/throttler';
import { UserAgent } from 'src/common/decorators/user-agent.decorator';
import { IMessage } from 'src/common/dto/responses/message.response';
import { ResetPasswordDto } from '../dtos/requests/reset-password.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Get('send/password/code/:email')
    @Throttle({ default: { limit: 3, ttl: 3600000 } })
    async sendPasswordUpdateEmail(@Param('email') email: string): Promise<IMessage> {
        return this.usersService.sendPasswordUpdateEmail(email);
    }

    @Post('reset/password/:token')
    @Throttle({ default: { limit: 1, ttl: 3600000 } })
    async changePassword(@Param('token') token: string, @Body() dto: ResetPasswordDto): Promise<IMessage> {
        return this.usersService.changePassword(token, dto.password);
    }
}
