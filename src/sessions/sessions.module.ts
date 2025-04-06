import { Module } from '@nestjs/common';
import { SessionsController } from './api/sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsService } from './services/sessions.service';
import { TokenEntity } from './entities/token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
