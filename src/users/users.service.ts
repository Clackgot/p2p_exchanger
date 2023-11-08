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

  async getUserByTelegramId(id: number): Promise<User | null> {
    return this.usersRepository.getUserByTelegramId(id);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.usersRepository.getUserById(id);
  }

  async createUserByTelegram(
    @Body() dto: CreateUserByTelegramDto,
  ): Promise<User> {
    return this.usersRepository.createUserByTelegram(dto);
  }
}
