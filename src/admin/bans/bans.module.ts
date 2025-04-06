import { Module } from '@nestjs/common';
import { BansService } from './services/bans.service';
import { BansController } from './controllers/bans.controller';

@Module({
  controllers: [BansController],
  providers: [BansService],
})
export class BansModule {}
