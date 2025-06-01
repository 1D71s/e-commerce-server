import { Module } from '@nestjs/common';
import { AdminsService } from './services/admins.service';
import { AdminsController } from './controllers/admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entities/admin.entity';
import { AdminRepository } from './repositories/admin.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
  ],
  controllers: [AdminsController],
  providers: [AdminsService, AdminRepository],
  exports: [AdminRepository]
})
export class AdminsModule {}
