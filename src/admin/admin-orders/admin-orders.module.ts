import { Module } from '@nestjs/common';
import { AdminOrdersService } from './services/admin-orders.service';
import { AdminOrdersController } from './controllers/admin-orders.controller';
import { OrdersModule } from '../../web/orders/orders.module';

@Module({
  imports: [
    OrdersModule
  ],
  controllers: [AdminOrdersController],
  providers: [AdminOrdersService],
})
export class AdminOrdersModule {}
