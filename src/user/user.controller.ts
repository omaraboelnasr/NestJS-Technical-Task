import { Body, Controller,Delete,Get,NotFoundException,Param,Patch,Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
    constructor(public userService:UserService){}
    @Post()
    createUser(@Body() createUserDto:CreateUserDto){
        return this.userService.createUser(createUserDto)
    }

    @Get()
    getAllUsers(){
        return this.userService.getAllUsers()
    }

    @Get('/:id')
    getUser(@Param('id') id:string){
        return this.userService.getUser(id)
    }

    @Patch('/:id')
    updateUser( @Param('id') id:string , @Body() updateUserDto:UpdateUserDto){
        return this.userService.updateUser(id,updateUserDto)
    }

    @Delete('/:id')
    deleteUser(@Param('id') id:string){
        return this.userService.deleteUser(id)
    }
}
