import { Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { AuthUserDto } from './dto/authUser.dto';

@Controller('auth')
export class AuthController {

    // @Post('register')
    // register(@Body() createUserDto:CreateUserDto){

    // }

    // @Post('login')
    // login(@Body() authUserDto:AuthUserDto){

    // }

}
