import { Module } from '@nestjs/common';
import { AdminAuthService } from './services/admin-auth.service';
import { AdminAuthController } from './controllers/admin-auth.controller';
import { AdminUsersModule } from '../admin-users/admin-users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAdminStrategy } from './strategies/jwt-admin.strategy';
import { JwtAuthAdminGuard } from './guards/auth.admin.guard';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_ADMIN_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AdminUsersModule,
    PassportModule,
  ],
  controllers: [
    AdminAuthController
  ],
  providers: [
    AdminAuthService,
    JwtAdminStrategy,
    JwtAuthAdminGuard
  ],
})
export class AdminAuthModule {}