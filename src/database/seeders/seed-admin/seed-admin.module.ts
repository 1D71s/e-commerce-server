import { Module } from '@nestjs/common';
import { SeedAdminService } from './seed-admin.service';
import { SeedRoleModule } from '../seed-role/seed-role.module';
import { AdminUsersModule } from '../../../admin/admin-users/admin-users.module';

@Module({
  imports: [
    AdminUsersModule,
    SeedRoleModule
  ],
  providers: [SeedAdminService],
  exports: [SeedAdminService]
})
export class SeedAdminModule {}
