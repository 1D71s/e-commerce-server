import { Module } from '@nestjs/common';
import { MailerService } from './services/mailer.service';

@Module({
  controllers: [],
  providers: [MailerService],
})
export class MailerModule {}
