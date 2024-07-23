import { Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Patch, 
    Post,
    Query
    } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserResponseDto } from './dto/responseUser.dto';
import { UserListResponseDto } from './dto/responseUserList.dto';
import { ListUsersRequest } from './dto/listUsersRequest.dto';

@Controller('user')
export class UserController {
    constructor(public userService: UserService) { }
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }
    
    @Get()
    async getAllUsers(@Query() queryParams:ListUsersRequest ):Promise<UserListResponseDto> {
        const { data, limit: limitStr, skip: skipStr, total } = await this.userService.getAllUsers(queryParams)
        return new UserListResponseDto(data, limitStr, skipStr, total);
    }

    @Get('/:id')
    async getUser(@Param('id') id: string):Promise<UserResponseDto> {
        const user = await this.userService.getUser(id)
        return new UserResponseDto(user)
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto)
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id)
    }
}
