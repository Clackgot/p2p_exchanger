import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/models/user.model';
import { EntityManager, Repository } from 'typeorm';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { TronAccount } from 'src/models/tron-account.model';
import { TronwebService } from 'src/providers/tronweb/tronweb.service';

@Injectable()
export class MerchantsRepository {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly tronwebService: TronwebService,
  ) {}

  async getMerchants(): Promise<User[]> {
    return this.usersRepository.find({ where: { role: UserRole.merchant } });
  }

  async getMerchantById(id: string): Promise<User> {
    const merchant = await this.usersRepository.findOne({
      where: { role: UserRole.merchant, id },
    });
    if (!merchant) throw new NotFoundException(`Мерчант с ID: ${id} не найден`);
    return merchant;
  }

  async createMerchant(dto: CreateMerchantDto): Promise<User> {
    const manager = this.usersRepository.manager;

    return manager.transaction(async (entityManager: EntityManager) => {
      try {
        const tronAccount: TronAccount =
          (await this.tronwebService.generateAddress()) as TronAccount;

        const user = new User();
        user.balance = dto.balance;
        user.role = UserRole.merchant;
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
