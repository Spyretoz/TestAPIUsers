import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { isNil } from 'lodash';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // Get auth token
      const request = context.switchToHttp().getRequest(); // get authorization from header
      const header = request.headers['authorization'];
      const token = header?.split?.(' ')[1]; // get 2nd element from authorization

      // check if there is a token
      if (isNil(token)) {
        throw new UnauthorizedException();
      }

      const myjwt = jwt.verify(token, 'secret'); // verify jwt
      const userId = myjwt['id'];

      const user = await this.userRepository.findOne({ id: userId });

      if (!user) {
        throw new UnauthorizedException();
      }

      request.user = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
