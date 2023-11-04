import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Balance } from 'src/models/balance.model';
import { TronAccount } from 'src/models/tron-account.model';
import { TronwebService } from 'src/providers/tronweb/tronweb.service';

@Injectable()
export class UsersRepository {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly tronwebService: TronwebService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUserByTelegramId(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        telegramUser: {
          id,
        },
      },
    });
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const manager = this.usersRepository.manager;
    const { id } = dto.telegramUser;
    const exsistUser = await this.getUserByTelegramId(id);

    if (exsistUser) {
      throw new ConflictException('Пользователь уже существует');
    }

    return manager.transaction(async (entityManager: EntityManager) => {
      try {
        const tronAccount: TronAccount =
          (await this.tronwebService.generateAddress()) as TronAccount;

        const user = new User();

        user.balance = new Balance();
        user.balance.rub = 0;
        user.balance.usdt = 0;
        user.balance.trx = 0;

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
