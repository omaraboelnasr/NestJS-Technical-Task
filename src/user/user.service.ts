import { UserRepository } from './user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ListUsersParams } from './types';

@Injectable()
export class UserService {
    constructor(private userRepository:UserRepository) { }

    async createUser(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto)
    }

    async getAllUsers(params:ListUsersParams) {
        const safeLimit = Math.min(params.limit,20) 
        const { users, total } = await this.userRepository.getAllUsers(safeLimit, params.skip)
        return { data: users, limit: safeLimit, skip: params.skip , total }
    }

    async getUser(id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid){
            throw new NotFoundException('Invalid id')
        }
        const user = await this.userRepository.getUser(id)
        if (!user) {
            throw new NotFoundException(`user with id: ${id} not found`)
        }
        return user
    }

    async updateUser(id: string,updateUserDto:UpdateUserDto){
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid){
            throw new NotFoundException('Invalid id')
        }
        const updatedUser = await this.userRepository.updateUser(id,updateUserDto)
        if (!updatedUser) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
        return {message:'User Update successfully'}
    }

    async deleteUser(id:string){
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid){
            throw new NotFoundException('Invalid id')
        }
        const user = await this.userRepository.deleteUser(id)
        if (!user) {
            throw new NotFoundException(`User with ID '${id}' not found`);
        }
        return {message:'User Delete successfully'}
    }
}
