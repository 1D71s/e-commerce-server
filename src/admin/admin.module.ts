import { Module } from '@nestjs/common';
import { AccessesModule } from './accesses/accesses.module';
import { AdminCategoriesModule } from './admin-categories/admin-categories.module';
import { AdminProductsModule } from './admin-products/admin-products.module';
import { RolesModule } from './roles/roles.module';
import { RouterModule } from '@nestjs/core';
import { AdminSubCategoriesModule } from './admin-sub-categories/admin-sub-categories.module';

const routes = [
  {
    path: 'admin',
    children: [
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
        path: '/sub-categories',
        module: AdminSubCategoriesModule,
      },
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
    AdminSubCategoriesModule
  ]
})
export class AdminModule {}
