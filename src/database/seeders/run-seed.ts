import { NestFactory } from '@nestjs/core';
import { SeedersModule } from './seeders.module';
import { SeedUserService } from './seed-user/seed-user.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedersModule);

  await app.get(SeedUserService).run();

  await app.close();
};

runSeed();
