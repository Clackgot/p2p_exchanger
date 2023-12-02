import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/models/user.model';
import { EntityManager, Repository } from 'typeorm';
import { CreateTraderDto } from './dto/create-trader.dto';
import { TronAccount } from 'src/models/tron-account.model';
import { Balance } from 'src/models/balance.model';
import { TronService } from 'src/tron/tron.service';

@Injectable()
export class TradersRepository {
  private logger = new Logger(this.constructor.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly tronService: TronService,
  ) {}

  async getTraders(): Promise<User[]> {
    return this.usersRepository.find({ where: { role: UserRole.trader } });
  }

  async getTraderById(id: string): Promise<User> {
    const trader = await this.usersRepository.findOne({
      where: { role: UserRole.trader, id },
    });
    if (!trader) throw new NotFoundException(`Трейдер с ID: ${id} не найден`);
    return trader;
  }

  async createTrader(dto: CreateTraderDto): Promise<User> {
    const manager = this.usersRepository.manager;

    return manager.transaction(async (entityManager: EntityManager) => {
      try {
        const tronAccount: TronAccount =
          (await this.tronService.generateTronAccount()) as TronAccount;

        const user = new User();

        user.balance = new Balance();
        user.balance.rub = 0;
        user.balance.usdt = 0;
        user.balance.trx = 0;

        user.bankCards = dto.bankCards;
        user.role = UserRole.trader;
        user.telegramUser = dto.telegramUser;
        user.tronAccount = tronAccount;

        return entityManager.save(user);
      } catch (err) {
        this.logger.warn(err.message);
        throw err;
      }
    });
  }
}
