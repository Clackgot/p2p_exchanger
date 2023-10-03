import { faker } from '@faker-js/faker/locale/ru';
import { generateCardHolder } from './generate-card-holder';

export function generateCards(options: { min: number; max: number }): Card[] {
  const cards: Card[] = [];
  const count = faker.number.int(options);
  for (let i = 0; i < count; i++) {
    const card: Card = {
      id: faker.number.int(),
      value: faker.finance.creditCardNumber('22[0-5]#-####-####-###L'),
      holder: generateCardHolder(),
      issuer: faker.finance.creditCardIssuer(),
    };
    cards.push(card);
  }
  return cards;
}
