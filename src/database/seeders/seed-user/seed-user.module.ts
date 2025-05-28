import { Module } from '@nestjs/common';
import { SeedUserService } from './seed-user.service';
import { SeedRoleModule } from '../seed-role/seed-role.module';
import { UsersModule } from 'src/web/users/users.module';

@Module({
  imports: [
    UsersModule,
    SeedRoleModule
  ],
  providers: [SeedUserService],
  exports: [SeedUserService]
})
export class SeedUserModule {}
