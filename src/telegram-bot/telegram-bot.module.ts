import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { TrongridModule } from 'src/providers/trongrid/trongrid.module';

@Module({
  imports: [TrongridModule],
  providers: [TelegramBotService],
})
export class TelegramBotModule {}
