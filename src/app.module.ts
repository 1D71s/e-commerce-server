import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { SessionsModule } from './sessions/sessions.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/product.module';
import { MailerModule } from './mailer/mailer.module';
import { AdminCategoriesModule } from './admin/admin-categories/admin-categories.module';
import { RolesModule } from './admin/roles/roles.module';
import { BansModule } from './admin/bans/bans.module';
import { AdminProductsModule } from './admin/admin-products/admin-products.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 6000,
      limit: 3,
    }]),
    // TelegramModule,
    UsersModule,
    AuthModule,
    DatabaseModule,
    SessionsModule,
    CategoriesModule,
    ProductsModule,
    MailerModule,
    AdminCategoriesModule,
    RolesModule,
    BansModule,
    AdminProductsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
