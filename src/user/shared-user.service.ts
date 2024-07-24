import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserParams } from './types';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class SharedUserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: CreateUserParams) {
    try {
      const userExist = await this.userRepository.getUserByEmail(user.email);
      if (userExist) {
        throw new BadRequestException('email is already exists');
      }
      const salt = await bcrypt.genSalt();
      const hashPass = await bcrypt.hash(user.password, salt);
      const newUser = await this.userRepository.createUser({
        ...user,
        password: hashPass,
      });
      return { newUser, message: 'User Create Successfully' };
    } catch (error) {
      throw error;
    }
  }
}
