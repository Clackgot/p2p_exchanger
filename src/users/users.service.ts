import { Body, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from 'src/models/user.model';
import { CreateUserByTelegramDto } from './dto/create-user-by-telegram.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.getAllUsers();
  }

  async getAllTraders(): Promise<User[]> {
    return this.usersRepository.getAllTraders();
  }
  async getAllMechants(): Promise<User[]> {
    return this.usersRepository.getAllMechants();
  }

  async getAllAdmins(): Promise<User[]> {
    return this.usersRepository.getAllAdmins();
  }
  async getAllGuests(): Promise<User[]> {
    return this.usersRepository.getAllGuests();
  }

  async getUserByTelegramId(id: number): Promise<User> {
    return this.usersRepository.getUserByTelegramId(id);
  }

  async isTelegramUserExists(telegramId: number): Promise<boolean> {
    return this.usersRepository.isTelegramUserExists(telegramId);
  }

  async getUserById(id: string): Promise<User> {
    return this.usersRepository.getUserById(id);
  }

  async createUserByTelegram(
    @Body() dto: CreateUserByTelegramDto,
  ): Promise<User> {
    return this.usersRepository.createUserByTelegram(dto);
  }

  async deleteUserById(id: string): Promise<User> {
    return this.usersRepository.deleteUserById(id);
  }
}
