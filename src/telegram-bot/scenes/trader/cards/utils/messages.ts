import { BankCard } from 'src/models/bank-card.model';
import { formatCardNumber } from 'src/telegram-bot/utils/format-card-numer';

export const displayCardMessage = (card: BankCard): string => {
  return `<b>💳 Номер</b>: ${formatCardNumber(
    card?.number,
  )}\n<b>👤 Держатель</b>: ${card?.holder || 'Неизвестно'}`;
};
