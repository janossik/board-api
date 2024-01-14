import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneByOrFail({ id });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneByOrFail({ email });
  }

  async create(email: string, password: string, permission?: number): Promise<User> {
    return this.usersRepository.save({
      email,
      password,
      permission,
    });
  }
}
