import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { TrongridModule } from 'src/providers/trongrid/trongrid.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TrongridModule, UsersModule],
  providers: [TelegramBotService],
})
export class TelegramBotModule {}
