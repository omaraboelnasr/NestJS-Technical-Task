import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';
import { UserRepository } from './user.repository';
@Module({
  imports: [
    MongooseModule.forFeature([{
      name:User.name,
      schema:UserSchema
    }])
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController]
})
export class UserModule {}
