import { Injectable } from '@nestjs/common';
import { Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Update()
@Injectable()
export class TelegramService {
    constructor(@InjectBot('bot') private readonly bot: Telegraf<Context>) {}

    @Start()
    async start(@Ctx() ctx: Context) {
        console.log('Working!');
        ctx.reply('Bot is working!');
    }
}
