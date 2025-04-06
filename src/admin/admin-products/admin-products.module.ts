import { Module } from '@nestjs/common';
import { AdminProductsService } from './services/admin-products.service';
import { AdminProductsController } from './controllers/admin-products.controller';

@Module({
  controllers: [AdminProductsController],
  providers: [AdminProductsService],
})
export class AdminProductsModule {}
