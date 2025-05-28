import { Module } from '@nestjs/common';
import { SeedUserService } from './seed-user.service';
import { UsersModule } from 'src/users/users.module';
import { SeedRoleModule } from '../seed-role/seed-role.module';

@Module({
  imports: [
    UsersModule,
    SeedRoleModule
  ],
  providers: [SeedUserService],
  exports: [SeedUserService]
})
export class SeedUserModule {}
