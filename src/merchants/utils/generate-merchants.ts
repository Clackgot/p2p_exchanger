import { faker } from '@faker-js/faker/locale/ru';
import { Merchant } from 'src/models/merchant.model';

export function generateMerchants(options: {
  min: number;
  max: number;
}): Merchant[] {
  const merchants: Merchant[] = [];
  const count: number = faker.number.int(options);

  for (let i = 0; i < count; i++) {
    const trader: Merchant = {
      id: faker.number.int({ min: 1000000000, max: 2000000000 }),
      name: faker.internet.userName(),
    };
    merchants.push(trader);
  }
  return merchants;
}
