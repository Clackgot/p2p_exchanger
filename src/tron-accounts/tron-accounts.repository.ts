import { Injectable } from '@nestjs/common';
import { TronAccount } from 'src/models/tron-account.model';
import { CreateTronAccountDto } from './dto/create-tron-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTronAccountDto } from './dto/update-tron-account.dto';
import { TronAccountNotFoundException } from './errors/tron-accout-not-found.exception';
import { TronAccountAlreadyExistsException } from './errors/tron-accout-already-exists.exception';

@Injectable()
export class TronAccountsRepository {
  constructor(
    @InjectRepository(TronAccount)
    private readonly tronAccountsRepository: Repository<TronAccount>,
  ) {}

  async getAll(): Promise<TronAccount[]> {
    return this.tronAccountsRepository.find();
  }

  async createTronAccount(dto: CreateTronAccountDto): Promise<TronAccount> {
    const account = await this.tronAccountsRepository.findOne({ where: dto });
    if (account) throw new TronAccountAlreadyExistsException(dto.address);
    return this.tronAccountsRepository.save(dto);
  }

  async getByAddress(address: string): Promise<TronAccount> {
    const account = await this.tronAccountsRepository.findOne({
      where: {
        address,
      },
    });
    if (!account) throw new TronAccountNotFoundException(address);

    return account;
  }

  async updateAccount(
    address: string,
    updateTronAccountDto: UpdateTronAccountDto,
  ): Promise<TronAccount> {
    const account = await this.tronAccountsRepository.findOne({
      where: {
        address,
      },
    });
    if (!account) throw new TronAccountNotFoundException(address);

    // Обновляем аккаунт
    this.tronAccountsRepository.merge(account, updateTronAccountDto);

    // Сохраняем изменения
    return this.tronAccountsRepository.save(account);
  }

  async updateTetherAvailability(
    address: string,
    isTetherAvailable: boolean,
  ): Promise<TronAccount> {
    const account = await this.tronAccountsRepository.findOne({
      where: {
        address,
      },
    });
    if (!account) throw new TronAccountNotFoundException(address);

    // Обновляем параметр
    account.isTetherAvailable = isTetherAvailable;

    // Сохраняем изменения
    return this.tronAccountsRepository.save(account);
  }

  async updateTrxAvailability(
    address: string,
    isEnoughTrx: boolean,
  ): Promise<TronAccount> {
    const account = await this.tronAccountsRepository.findOne({
      where: {
        address,
      },
    });
    if (!account) throw new TronAccountNotFoundException(address);

    // Обновляем параметр
    account.isEnoughTrx = isEnoughTrx;

    // Сохраняем изменения
    return this.tronAccountsRepository.save(account);
  }

  async updateActivationStatus(
    address: string,
    isActivated: boolean,
  ): Promise<TronAccount> {
    const account = await this.tronAccountsRepository.findOne({
      where: {
        address,
      },
    });
    if (!account) throw new TronAccountNotFoundException(address);

    // Обновляем параметр
    account.isActivated = isActivated;

    // Сохраняем изменения
    return this.tronAccountsRepository.save(account);
  }
}
