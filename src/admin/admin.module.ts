import { Module } from '@nestjs/common';
import { AccessesModule } from './accesses/accesses.module';
import { AdminCategoriesModule } from './admin-categories/admin-categories.module';
import { AdminProductsModule } from './admin-products/admin-products.module';
import { RolesModule } from './roles/roles.module';
import { RouterModule } from '@nestjs/core';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminOrdersModule } from './admin-orders/admin-orders.module';

const routes = [
  {
    path: 'admin',
    children: [
      {
        path: '/',
        module: AdminUsersModule,
      },
      {
        path: '/roles',
        module: RolesModule,
      },
      {
        path: '/accesses',
        module: AccessesModule,
      },
      {
        path: '/products',
        module: AdminProductsModule,
      },
      {
        path: '/categories',
        module: AdminCategoriesModule,
      },
      {
        path: '/auth',
        module: AdminAuthModule,
      },
      {
        path: '/orders',
        module: AdminOrdersModule,
      }
    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    AdminCategoriesModule,
    RolesModule,
    AdminProductsModule,
    AccessesModule,
    AdminUsersModule,
    AdminAuthModule,
    AdminOrdersModule
  ]
})
export class AdminModule {}
