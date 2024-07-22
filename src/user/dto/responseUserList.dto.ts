import {  UserDocument } from "../schema/users.schema";
import { UserResponseDto } from "./responseUser.dto";

export class UserListResponseDto {
    data:UserResponseDto[]
    limit:string
    offset:string
    total:number
    constructor(data:UserDocument[],limit:string,offset:string,total:number){
        this.data = data.map(user => new UserResponseDto(user))
        this.limit=limit
        this.offset=offset
        this.total=total
    }
}