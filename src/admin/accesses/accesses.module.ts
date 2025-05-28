import { Module } from '@nestjs/common';
import { AccessesService } from './services/accesses.service';
import { AccessesController } from './controllers/accesses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessEntity } from './entities/access.entity';
import { AccessRepository } from './repositories/access.repository';
import { UsersModule } from 'src/web/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccessEntity]),
    UsersModule
  ],
  controllers: [AccessesController],
  providers: [AccessesService, AccessRepository],
  exports: [AccessRepository, AccessesService]
})
export class AccessesModule {}
