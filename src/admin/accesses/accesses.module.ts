import { Module } from '@nestjs/common';
import { AccessesService } from './services/accesses.service';
import { AccessesController } from './controllers/accesses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessEntity } from './entities/access.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccessEntity]),
  ],
  controllers: [AccessesController],
  providers: [AccessesService],
})
export class AccessesModule {}
