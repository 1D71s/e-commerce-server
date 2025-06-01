import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { HttpModule } from '@nestjs/axios';
import { GoogleStrategy } from './strategies/google.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from '../sessions/entities/session.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/auth.guard';
import { PassportModule } from '@nestjs/passport';
import { GoogleAuthController } from './controllers/google-auth.controller';
import { RedisModule } from 'src/redis/redis.module';
import { UserEntity } from 'src/web/users/entities/user.entity';
import { UsersModule } from 'src/web/users/users.module';
import { MailerService } from '../../mailer/services/mailer.service';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([UserEntity, SessionEntity]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '5m' },
        }),
        HttpModule,
        PassportModule,
        SessionsModule,
        UsersModule,
        RedisModule
    ],
    controllers: [
        AuthController, 
        GoogleAuthController
    ],
    providers: [
        MailerService,
        AuthService,
        GoogleStrategy,
        JwtStrategy,
        JwtAuthGuard
    ],
})
export class AuthModule {}
