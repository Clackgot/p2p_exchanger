import { faker } from '@faker-js/faker/locale/ru';
import { generateCards } from './generate-cards';

export function generateTraders(options: {
  min: number;
  max: number;
}): Trader[] {
  const traders: Trader[] = [];
  const count = faker.number.int(options);
  for (let i = 0; i < count; i++) {
    const trader: Trader = {
      id: faker.number.int({ min: 1000000000, max: 2000000000 }),
      name: faker.internet.userName(),
      cards: generateCards({ min: 2, max: 8 }),
    };
    traders.push(trader);
  }
  return traders;
}
