import { BadRequestException } from '@nestjs/common';
import { BankCard } from 'src/models/bank-card.model';

export const parseCardNumber = (
  rawCardData: string,
): Pick<BankCard, 'id' | 'holder'> => {
  const regex = /^(\d{16})\s+(.+)$/;
  const match = rawCardData.match(regex);

  if (match) {
    const id = match[1];
    const holder = match[2];
    return {
      id,
      holder,
    };
  }
  throw new BadRequestException('Неверный формат. Попробуй ещё раз');
};
