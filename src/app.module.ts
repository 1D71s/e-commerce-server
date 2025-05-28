import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { RedisModule } from './redis/redis.module';
import { FilesModule } from './files/files.module';
import { WebModule } from './web/web.module';
import { DatabaseModule } from './database/database.module';
import { MailerModule } from './mailer/mailer.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './web/users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        ThrottlerModule.forRoot([{
            ttl: 6000,
            limit: 3,
        }]),
        RedisModule,
        FilesModule,
        WebModule,
        DatabaseModule,
        MailerModule,
        AdminModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
