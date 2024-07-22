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

@Controller('user')
export class UserController {
    constructor(public userService: UserService) { }
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }
    
    @Get()
    async getAllUsers(@Query('limit') limit:string,@Query('offset') offset:string):Promise<UserListResponseDto> {
        const { data, limit: limitStr, offset: offsetStr, total } = await this.userService.getAllUsers(limit, offset)
        return new UserListResponseDto(data, limitStr, offsetStr, total);
    }

    @Get('/:id')
    async getUser(@Param('id') id: string):Promise<UserResponseDto> {
        const user = await this.userService.getUser(id)
        console.log(user);
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
