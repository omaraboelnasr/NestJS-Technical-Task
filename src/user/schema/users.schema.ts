import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;
export class User {
    @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
    _id: MongooseSchema.Types.ObjectId;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    @Exclude()
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);