import { Injectable, Logger } from '@nestjs/common';
import { Trader } from 'src/models/trader.model';
import { faker } from '@faker-js/faker/locale/ru';
import { transliterate as ru } from 'transliteration';
import { Card } from 'src/models/card.model';
import { TronwebService } from 'src/providers/tronweb/tronweb.service';

@Injectable()
export class MockTradersRepository {
  private logger = new Logger('MockTradersRepository');
  private traders: Trader[] = [];

  constructor(private readonly tronwebService: TronwebService) {
    this.generateTraders({ min: 4, max: 10 }).then((generatedTraders) => {
      this.traders = generatedTraders;
      this.logger.debug(`Создано ${this.traders.length} тестовых трейдеров`);
    });
  }

  async getTraders(): Promise<Trader[]> {
    return this.traders;
  }

  async getTraderById(id: number): Promise<Trader | undefined> {
    return this.traders.find((t) => t.id === id);
  }

  private async generateTraders(options: {
    min: number;
    max: number;
  }): Promise<Trader[]> {
    const traders: Trader[] = [];
    const count = faker.number.int(options);
    for (let i = 0; i < count; i++) {
      const trader: Trader = {
        id: faker.number.int({ min: 1000000000, max: 2000000000 }),
        name: faker.internet.userName(),
        cards: this.generateCards({ min: 2, max: 8 }),
        tron: await this.tronwebService.generateAddress(),
      };
      traders.push(trader);
    }
    return traders;
  }

  private generateCardHolder(): string {
    const sex = Math.random() < 0.5 ? 'male' : 'female';
    return ru(`${faker.person.lastName(sex)} ${faker.person.firstName(sex)}`);
  }

  private generateCards(options: { min: number; max: number }): Card[] {
    const cards: Card[] = [];
    const count = faker.number.int(options);
    for (let i = 0; i < count; i++) {
      const card: Card = {
        id: faker.number.int(),
        value: faker.finance.creditCardNumber('22[0-5]#-####-####-###L'),
        holder: this.generateCardHolder(),
        issuer: faker.finance.creditCardIssuer(),
      };
      cards.push(card);
    }
    return cards;
  }
}
