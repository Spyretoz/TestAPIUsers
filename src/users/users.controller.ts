import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  // create a new user
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  // login as existing user
  @Post('login')
  login(@Body() LoginDto: LoginDto) {
    return this.userService.login(LoginDto);
  }

  // show user data
  @UseGuards(AuthGuard)
  @Get('me')
  show(@Req() req: any) {
    return this.userService.getUser(req.user);
  }
}
