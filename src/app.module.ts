import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/auth-task'), UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
