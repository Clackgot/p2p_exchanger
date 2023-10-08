import { Injectable } from '@nestjs/common';
import applicationConstants from 'src/config/applicationConstants';
import { Telegraf } from 'telegraf';
import * as crypto from 'node:crypto';
import { TrongridService } from 'src/providers/trongrid/trongrid.service';

@Injectable()
export class TelegramBotService {
  constructor(private readonly trongridService: TrongridService) {}

  private bot = new Telegraf(applicationConstants.TELEGRAM.TELEGRAM_BOT_TOKEN);
  async onModuleInit() {
    const result = await this.init();
  }
  async init() {
    this.bot.start((ctx) =>
      ctx.reply('Доступные команды: /getBalance <АДРЕС>'),
    );

    this.bot.command('getBalance', async (ctx) => {
      // Извлекаем аргумент <АДРЕС> из текста команды
      const address = ctx.message.text.split(' ')[1];
      if (!address) ctx.reply('Введите TRON адрес');
      // Выполняем логику для получения баланса по указанному адресу
      // В этом примере просто отправляем сообщение с адресом пользователя
      const addressInfo = await this.trongridService.getAddressInfo(address);
      const message: string = `<b>Адрес:</b> ${address}\n<b>Баланс TRX:</b> ${addressInfo.trxBalance.toFixed(
        2,
      )}\n<b>Баланс USDT:</b> ${addressInfo.usdtTetherBalance.toFixed(2)}`;
      ctx.reply(message, { parse_mode: 'HTML' });
    });

    const secretToken = crypto.randomBytes(64).toString('hex');
    this.bot.launch({
      webhook: {
        domain: applicationConstants.TELEGRAM.TELEGRAM_WEBHOOK_DOMAIN,
        port: applicationConstants.TELEGRAM.TELEGRAM_WEBHOOK_PORT,
        secretToken,
      },
    });
    return 'Hello';
  }
}
