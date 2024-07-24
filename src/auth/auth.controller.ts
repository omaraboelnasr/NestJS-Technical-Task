import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthUserDto } from './dto/authUser.dto';
import { AppRequest } from 'src/types/custom/user';

@Controller('auth')
export class AuthController {
  constructor(public authservice: AuthService) {}

  @Post('login')
  login(@Body() authUserDto: AuthUserDto) {
    return this.authservice.login(authUserDto);
  }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authservice.register(createUserDto);
  }
}
