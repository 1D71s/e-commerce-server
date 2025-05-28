import { Module } from '@nestjs/common';
import { SeedUserModule } from './seed-user/seed-user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from '../config';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot(getConfig()),
    SeedUserModule
  ],
  controllers: [],
  providers: [],
})
export class SeedersModule {}
