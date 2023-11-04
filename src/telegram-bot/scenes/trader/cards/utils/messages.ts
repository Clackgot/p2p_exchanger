import { BankCard } from 'src/models/bank-card.model';
import { formatCardNumber } from 'src/telegram-bot/utils/format-card-numer';

export const getCreatedCardNumberMessage = (card: BankCard): string => {
  return `✨ Карта добавлена\n<b>💳 Номер</b>: ${formatCardNumber(
    card.id,
  )}\n<b>👤 Держатель</b>: ${card.holder}`;
};
