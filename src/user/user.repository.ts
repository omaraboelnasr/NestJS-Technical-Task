import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "./schema/users.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Injectable()
export class UserRepository{
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async createUser(createUserDto: CreateUserDto) {
        const newUser = new this.userModel(createUserDto)
        return newUser.save()
    }

    async getAllUsers(limit:number,skip:number) {
        const total = await this.userModel.countDocuments();
        const users = await this.userModel.find().skip(skip).limit(limit).lean();
        return { users, total };
    }

    async getUser(id: string) {
        return this.userModel.findById(id).lean()
    }

    async updateUser(id: string,updateUserDto:UpdateUserDto){
        return this.userModel.findByIdAndUpdate(id,updateUserDto,{new:true})
    }

    async deleteUser(id:string){
        return this.userModel.findByIdAndDelete(id)
    }
}