import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthUserDto } from './dto/authUser.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AppRequest } from 'src/types/custom/user';

@Controller('auth')
export class AuthController {
    constructor(public authservice:AuthService){}

    @Post('login')
    login(@Body() authUserDto:AuthUserDto){
        return this.authservice.login(authUserDto)
    }

    @Post('register')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.authservice.register(createUserDto)
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req:AppRequest){
        console.log('user req',req.user);
        return req.user
    }

}
