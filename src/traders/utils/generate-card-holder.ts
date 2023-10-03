import { faker } from '@faker-js/faker/locale/ru';
import { transliterate as ru } from 'transliteration';

export function generateCardHolder(): string {
  const sex = Math.random() < 0.5 ? 'male' : 'female';
  return ru(`${faker.person.lastName(sex)} ${faker.person.firstName(sex)}`);
}
