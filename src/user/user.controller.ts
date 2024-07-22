import { Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Patch, 
    Post, 
    UseInterceptors, 
    ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './schema/users.schema';
import { UserResponseDto } from './dto/responseUser.dto';

@Controller('user')
export class UserController {
    constructor(public userService: UserService) { }
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }
    
    @Get()
    async getAllUsers():Promise<UserResponseDto[]> {
        const users = await this.userService.getAllUsers()
        return users.map(user=>new UserResponseDto(user))
    }

    @Get('/:id')
    getUser(@Param('id') id: string) {
        return this.userService.getUser(id)
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
