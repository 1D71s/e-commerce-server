import { Module } from '@nestjs/common';
import { SeedRoleService } from './seed-role.service';
import { RolesModule } from 'src/admin/roles/roles.module';
import { SeedAccessModule } from '../seed-access/seed-access.module';

@Module({
  imports: [RolesModule, SeedAccessModule],
  providers: [SeedRoleService],
  exports: [SeedRoleService]
})
export class SeedRoleModule {}
