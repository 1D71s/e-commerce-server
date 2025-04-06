import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './api/auth.controller';
import { HttpModule } from '@nestjs/axios';
import { GoogleStrategy } from './strategies/google-strategy';
import { UsersService } from 'src/users/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { TokenEntity } from '../sessions/entities/token.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt-strategy';
import { JwtAuthGuard } from './guards/auth.guard';
import { SessionsService } from 'src/sessions/services/sessions.service';
import { MailerService } from 'src/mailer/services/mailer.service';
import { ResetToken } from './entities/reset-token.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity, TokenEntity, ResetToken]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
    HttpModule,
    PassportModule
  ],
  controllers: [AuthController],
  providers: [
    MailerService,
    SessionsService,
    UsersService,
    AuthService,
    GoogleStrategy,
    JwtStrategy,
    JwtAuthGuard
  ],
})
export class AuthModule {}
