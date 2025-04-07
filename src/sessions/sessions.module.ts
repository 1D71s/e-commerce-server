import { Module } from '@nestjs/common';
import { SessionsController } from './controllers/sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsService } from './services/sessions.service';
import { SessionEntity } from './entities/session.entity';
import { SessionRepository } from './repositories/session.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionEntity]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService, SessionRepository],
  exports: [SessionRepository, SessionsService]
})
export class SessionsModule {}
