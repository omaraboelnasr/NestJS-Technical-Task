import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(createUserDto: CreateUserDto) {
        const newUser = new this.userModel(createUserDto)
        return newUser.save()
    }

    async getAllUsers() {
        return this.userModel.find()
    }

    async getUser(id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid){
            throw new NotFoundException('Invalid id')
        }
        const user = await this.userModel.findById(id)
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
        const updatedUser = await this.userModel.findByIdAndUpdate(id,updateUserDto,{new:true})
        if (!updatedUser) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
        return updatedUser
    }

    async deleteUser(id:string){
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid){
            throw new NotFoundException('Invalid id')
        }
        const user = await this.userModel.findByIdAndDelete(id)
        if (!user) {
            throw new NotFoundException(`User with ID '${id}' not found`);
        }
        return user
    }
}
