import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
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
import { ResetToken } from '../users/entities/reset-token.entity';
import { PassportModule } from '@nestjs/passport';
import { SessionsModule } from 'src/sessions/sessions.module';
import { UsersModule } from 'src/users/users.module';
import { GoogleAuthController } from './controllers/google-auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity, TokenEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
    HttpModule,
    PassportModule,
    SessionsModule,
    UsersModule
  ],
  controllers: [AuthController, GoogleAuthController],
  providers: [
    MailerService,
    AuthService,
    GoogleStrategy,
    JwtStrategy,
    JwtAuthGuard
  ],
})
export class AuthModule {}
