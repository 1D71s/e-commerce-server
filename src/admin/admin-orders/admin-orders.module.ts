import { Module } from '@nestjs/common';
import { AdminOrdersService } from './services/admin-orders.service';
import { AdminOrdersController } from './controllers/admin-orders.controller';

@Module({
  controllers: [AdminOrdersController],
  providers: [AdminOrdersService],
})
export class AdminOrdersModule {}
