import { Module } from '@nestjs/common';
import { BasketsService } from './services/baskets.service';
import { BasketsController } from './controllers/baskets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemEntity } from './entities/cart-item.entity';
import { BasketRepository } from './repositories/basket.repository';
import { ProductsModule } from '../products/product.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartItemEntity
    ]),
    ProductsModule,
    UsersModule
  ],
  controllers: [BasketsController],
  providers: [
    BasketsService,
    BasketRepository,
  ],
})
export class BasketsModule {}
