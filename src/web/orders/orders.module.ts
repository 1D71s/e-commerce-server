import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
