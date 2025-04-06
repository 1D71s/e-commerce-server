import { Module } from '@nestjs/common';
import { BansService } from './services/bans.service';
import { BansController } from './api/bans.controller';

@Module({
  controllers: [BansController],
  providers: [BansService],
})
export class BansModule {}
