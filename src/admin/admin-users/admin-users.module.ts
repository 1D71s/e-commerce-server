import { Module } from '@nestjs/common';
import { AdminUsersService } from './services/admin-users.service';
import { AdminUsersController } from './controllers/admin-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserEntity } from './entities/admin.entity';
import { AdminUserRepository } from './repositories/admin-user.repository';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUserEntity]),
    RolesModule
  ],
  controllers: [AdminUsersController],
  providers: [AdminUsersService, AdminUserRepository],
  exports: [AdminUserRepository]
})
export class AdminUsersModule {}
