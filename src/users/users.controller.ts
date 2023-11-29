import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/models/user.model';
import { CreateUserByTelegramDto } from './dto/create-user-by-telegram.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Post()
  async createUserByTelegram(
    @Body() dto: CreateUserByTelegramDto,
  ): Promise<User> {
    return this.usersService.createUserByTelegram(dto);
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUserById(id);
  }
}
