import { Module } from '@nestjs/common';
import { SeedAdminService } from './seed-admin.service';
import { SeedRoleModule } from '../seed-role/seed-role.module';
import { AdminsModule } from '../../../admin/admins/admins.module';

@Module({
  imports: [
    AdminsModule,
    SeedRoleModule
  ],
  providers: [SeedAdminService],
  exports: [SeedAdminService]
})
export class SeedAdminModule {}
