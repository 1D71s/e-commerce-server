import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './services/orders.service';
import { OrderEntity } from './entities/order.entity';
import { OrderQuantityEntity } from './entities/order-quantity.entity';
import { OrderAddressEntity } from './entities/order-address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderQuantityEntity, OrderAddressEntity])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
