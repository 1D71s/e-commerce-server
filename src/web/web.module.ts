import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { BasketsModule } from './baskets/baskets.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/product.module';
import { SessionsModule } from './sessions/sessions.module';

const routes = [
  {
    path: 'web',
    children: [
      {
        path: '/auth',
        module: AuthModule,
      },
      {
        path: '/basket',
        module: BasketsModule,
      },
      {
        path: '/categories',
        module: CategoriesModule,
      },
      {
        path: '/orders',
        module: OrdersModule,
      },
      {
        path: '/products',
        module: ProductsModule,
      },
      {
        path: '/sessions',
        module: SessionsModule,
      },
      {
        path: '/users',
        module: UsersModule,
      },
    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    UsersModule,
    BasketsModule,
    OrdersModule,
    AuthModule,
    SessionsModule,
    CategoriesModule,
    ProductsModule,
  ],
})
export class WebModule {}
