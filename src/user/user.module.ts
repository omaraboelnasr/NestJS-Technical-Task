import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';
import { UserRepository } from './user.repository';
import { SharedUserService } from './shared-user.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService, UserRepository, SharedUserService, JwtService],
  controllers: [UserController],
  exports: [SharedUserService, UserRepository],
})
export class UserModule {}
