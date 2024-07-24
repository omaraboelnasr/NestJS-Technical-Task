import { UserRepository } from './user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserParams, ListUsersParams, UpdateUserParams } from './types';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async getAllUsers(params: ListUsersParams) {
        const safeLimit = Math.min(params.limit, 20)
        const { users, total } = await this.userRepository.getAllUsers(safeLimit, params.skip)
        return { data: users, limit: safeLimit, skip: params.skip, total }
    }

    async getUser(id: string) {
        const user = await this.userRepository.getUser(id)
        if (!user) {
            throw new NotFoundException(`user with id: ${id} not found`)
        }
        return user
    }

    async updateUser(id: string, user: UpdateUserParams) {
        if (user.password) {
            const salt = await bcrypt.genSalt();
            const hashPass = await bcrypt.hash(user.password, salt)
            user.password = hashPass
        }
        const updatedUser = await this.userRepository.updateUser(id, user)
        if (!updatedUser) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
        return { message: 'User Update successfully' }
    }

    async deleteUser(id: string) {
        const user = await this.userRepository.deleteUser(id)
        if (!user) {
            throw new NotFoundException(`User with ID '${id}' not found`);
        }
        return { message: 'User Delete successfully' }
    }
}
