import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: 'bot',
      useFactory: () => ({
        token: process.env.TG_TOKEN, 
      }),
    }),
  ],
  providers: [TelegramService],
})
export class TelegramModule {}
