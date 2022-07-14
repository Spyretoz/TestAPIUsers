import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async register(data: CreateUserDto) {
    const email = data.email;
    const user = await this.userRepository.findOne({ email });

    if (user) {
      return 'Email already in use';
    }

    const saltOrRounds = 13;
    const hash = await bcrypt.hash(data.password, saltOrRounds);

    return this.userRepository.save({
      email: data.email,
      username: data.username,
      password: hash
    });
  }

  // find a user
  async login(data: LoginDto) {
    const username = data.username;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username: username })
      .addSelect('user.password')
      .getOne();

    // check username
    if (!user) {
      throw new UnauthorizedException();
    }

    const userId = user.id;
    const userPass = user.password;

    // check password
    if (!(await bcrypt.compare(data.password, userPass))) {
      throw new UnauthorizedException();
    }

    const token = jwt.sign({ id: userId }, 'secret');

    return token;
  }

  async getUser(data: any) {
    return data;
  }

  findAll() {
    return 'haha';
  }
}