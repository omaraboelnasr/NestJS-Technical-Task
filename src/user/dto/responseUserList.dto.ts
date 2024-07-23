import {  UserDocument } from "../schema/users.schema";
import { UserResponseDto } from "./responseUser.dto";

export class UserListResponseDto {
    data:UserResponseDto[]
    limit:number
    skip:number
    totalRecords:number
    totalPages:number
    constructor(data:UserDocument[],limit:number,skip:number,totalRecords:number){
        this.data = data.map(user => new UserResponseDto(user))
        this.limit=limit
        this.skip=skip
        this.totalRecords=totalRecords
        this.totalPages = Math.ceil(totalRecords/this.limit)
    }
}