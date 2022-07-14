import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({})
  ],
  controllers: [UsersController],
  providers: [UserService]
})
export class UsersModule {}
