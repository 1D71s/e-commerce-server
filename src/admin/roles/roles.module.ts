import { Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { RolesController } from './api/roles.controller';
import { UsersService } from 'src/users/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [RolesController],
  providers: [RolesService, UsersService],
})
export class RolesModule {}
