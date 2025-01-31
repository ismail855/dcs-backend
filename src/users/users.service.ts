import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createAdminUser(
    email: string,
    password: string,
    mobileNumber: number,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      mobileNumber,
      password: hashedPassword,
      role: UserRole.ADMIN,
    });
    return this.userRepository.save(user);
  }

  async createUser(
    email: string,
    password: string,
    mobileNumber: number,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      mobileNumber,
      password: hashedPassword,
      role: UserRole.USER,
    });
    return this.userRepository.save(user);
  }
}
