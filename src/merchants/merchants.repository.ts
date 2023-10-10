import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class MerchantsRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
}
