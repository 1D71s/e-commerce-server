import { Module } from '@nestjs/common';
import { SeedAccessService } from './seed-access.service';
import { AccessesModule } from 'src/admin/accesses/accesses.module';

@Module({
  imports: [
    AccessesModule
  ],
  controllers: [],
  providers: [SeedAccessService],
  exports: [SeedAccessService]
})
export class SeedAccessModule {}
