import { Module } from '@nestjs/common';
import { SessionsController } from './controllers/sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsService } from './services/sessions.service';
import { TokenEntity } from './entities/token.entity';
import { TokenRepository } from './repositories/token.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService, TokenRepository],
  exports: [TokenRepository, SessionsService]
})
export class SessionsModule {}
