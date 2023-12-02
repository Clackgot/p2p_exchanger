import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/models/user.model';
import { EntityManager, Repository } from 'typeorm';
import { Balance } from 'src/models/balance.model';
import { TronAccount } from 'src/models/tron-account.model';
import { CreateUserByTelegramDto } from './dto/create-user-by-telegram.dto';
import { TelegramUser } from 'src/models/telegram-user.model';
import { TronService } from 'src/tron/tron.service';
import {
  TelegramUserNotFoundException,
  UserNotFoundException,
} from './errors/user-not-found.exception';

@Injectable()
export class UsersRepository {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly tronService: TronService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getAllTraders(): Promise<User[]> {
    return this.usersRepository.find({ where: { role: UserRole.trader } });
  }

  async getAllMechants(): Promise<User[]> {
    return this.usersRepository.find({ where: { role: UserRole.merchant } });
  }

  async getAllAdmins(): Promise<User[]> {
    return this.usersRepository.find({ where: { role: UserRole.admin } });
  }
  async getAllGuests(): Promise<User[]> {
    return this.usersRepository.find({ where: { role: UserRole.guest } });
  }

  async getUserByTelegramId(telegramId: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        telegramUser: {
          telegramId,
        },
      },
    });

    if (!user) {
      throw new TelegramUserNotFoundException(telegramId);
    }
    return user;
  }

  async isTelegramUserExists(telegramId: number): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: {
        telegramUser: {
          telegramId,
        },
      },
    });
    return !!user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  async createUserByTelegram(dto: CreateUserByTelegramDto): Promise<User> {
    const manager = this.usersRepository.manager;
    const { telegramId, username } = dto;
    const exsistUser = await this.isTelegramUserExists(telegramId);

    if (exsistUser) {
      throw new ConflictException('Пользователь уже существует');
    }

    return manager.transaction(async (entityManager: EntityManager) => {
      try {
        const tronAccount: TronAccount =
          this.tronService.generateTronAccount() as TronAccount;

        const user = new User();

        user.balance = new Balance();
        user.balance.rub = 0;
        user.balance.usdt = 0;
        user.balance.trx = 0;

        user.telegramUser = new TelegramUser();
        user.telegramUser.telegramId = telegramId;
        user.telegramUser.username = username;
        user.tronAccount = tronAccount;
        return entityManager.save(user);
      } catch (err) {
        this.logger.warn(err.message);
        throw err;
      }
    });
  }

  async deleteUserById(id: string): Promise<User> {
    const user = await this.getUserById(id);

    await this.usersRepository.remove(user);

    return user;
  }
}
