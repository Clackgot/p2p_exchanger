import { BadRequestException } from '@nestjs/common';
import { BankCard } from 'src/models/bank-card.model';

export const parseCardNumber = (
  rawCardData: string,
): Pick<BankCard, 'number' | 'holder'> => {
  const regex = /^(\d{16})\s+(.+)$/;
  const match = rawCardData.match(regex);

  if (match) {
    const number = match[1];
    const holder = match[2];
    return {
      number,
      holder,
    };
  }
  throw new BadRequestException('Неверный формат');
};
