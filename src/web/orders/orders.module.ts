import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './services/orders.service';
import { OrderEntity } from './entities/order.entity';
import { OrderQuantityEntity } from './entities/order-quantity.entity';
import { OrderAddressEntity } from './entities/order-address.entity';
import { OrderRepository } from './repositories/order.reposotory';
import { OrderAddressRepository } from './repositories/order-address.repository';
import { OrderQuantityRepository } from './repositories/order-quantity.repository';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderQuantityEntity,
      OrderAddressEntity
    ]),
    UsersModule,
    ProductsModule
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderRepository,
    OrderAddressRepository,
    OrderQuantityRepository
  ],
})
export class OrdersModule {}
