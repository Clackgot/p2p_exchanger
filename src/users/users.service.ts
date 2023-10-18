import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from 'src/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.getAllUsers();
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    return this.usersRepository.createUser(dto);
  }
  async getUserByTelegramId(identifier: number): Promise<User | null> {
    return this.usersRepository.getUserByTelegramId(identifier);
  }
}
