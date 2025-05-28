import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { ResetToken } from './entities/reset-token.entity';
import { ResetTokenRepository } from './repositories/reset-user.repository';
import { MailerModule } from '../../mailer/mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ResetToken]), MailerModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, ResetTokenRepository],
  exports: [UsersService, UserRepository]
})
export class UsersModule { }
