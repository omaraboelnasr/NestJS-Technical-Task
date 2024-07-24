import { BadRequestException, Injectable } from '@nestjs/common';
import { SharedUserService } from 'src/user/shared-user.service';
import { CreateUserParams, LoginUserParams } from './types';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private sharedUserService: SharedUserService,
        private userRepository:UserRepository,
        private jwtService: JwtService
    ) { }

    async register(user: CreateUserParams) {
        const newUser = await this.sharedUserService.createUser(user)
        return newUser
    }

    async login(user:LoginUserParams){
        const userExist = await this.userRepository.getUserByEmail(user.email)
        if (!userExist) {
            throw new BadRequestException('invalid email or password');
        }
        const isMatch = await bcrypt.compare(user.password, userExist.password);
        if (!isMatch) {
            throw new BadRequestException('invalid email or password');
        }
        const payload = { email: userExist.email, id: userExist._id, username:userExist.username };
        return { access_token: this.jwtService.sign(payload) };
    }

}
