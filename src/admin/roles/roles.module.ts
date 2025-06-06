import { Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { RoleRepository } from './repositories/role.repository';
import { UserEntity } from 'src/web/users/entities/user.entity';
import { UsersModule } from 'src/web/users/users.module';
import { AccessesModule } from '../accesses/accesses.module';
import { AdminUsersModule } from '../admin-users/admin-users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    AccessesModule
  ],
  controllers: [RolesController],
  providers: [RolesService, RoleRepository],
  exports: [RoleRepository]
})
export class RolesModule {}
