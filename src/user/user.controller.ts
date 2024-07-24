import { SharedUserService } from './shared-user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserResponseDto } from './dto/responseUser.dto';
import { UserListResponseDto } from './dto/responseUserList.dto';
import { ListUsersRequest } from './dto/listUsersRequest.dto';
import { IdParam } from './dto/idParam.dto';
import { AppRequest } from 'src/types/custom/user';
import { AuthGuard } from '@nestjs/passport';
import { OwnershipGuard } from 'src/guards/ownership.guard';

@Controller('user')
export class UserController {
  constructor(
    public userService: UserService,
    private SharedUserService: SharedUserService,
  ) {}
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.SharedUserService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllUsers(
    @Query() queryParams: ListUsersRequest,
  ): Promise<UserListResponseDto> {
    const { data, limit, skip, total } =
      await this.userService.getAllUsers(queryParams);
    return new UserListResponseDto(data, limit, skip, total);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Param() { id }: IdParam): Promise<UserResponseDto> {
    const user = await this.userService.getUser(id);
    return new UserResponseDto(user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'), new OwnershipGuard())
  updateUser(@Param() { id }: IdParam, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), new OwnershipGuard())
  deleteUser(@Param() { id }: IdParam) {
    return this.userService.deleteUser(id);
  }
}
