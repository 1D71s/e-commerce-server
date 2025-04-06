import { Module } from '@nestjs/common';
import { ProductsController } from './api/products.controller';
import { ProductsService } from './services/products.service';
import { ProductsRepository } from './repositories/product.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
