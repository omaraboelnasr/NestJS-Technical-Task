import { User, UserDocument } from "../schema/users.schema";

export class UserResponseDto {
    _id: string;
    username: string;
    email: string;

    constructor(user: UserDocument) {
        this._id = user._id.toString()
        this.username = user.username
        this.email = user.email
    }
}