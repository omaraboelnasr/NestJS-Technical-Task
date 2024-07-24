import { SharedUserService } from './shared-user.service';
import { Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Patch, 
    Post,
    Query,
    Req,
    UnauthorizedException,
    UseGuards
    } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserResponseDto } from './dto/responseUser.dto';
import { UserListResponseDto } from './dto/responseUserList.dto';
import { ListUsersRequest } from './dto/listUsersRequest.dto';
import { IdParam } from './dto/idParam.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AppRequest } from 'src/types/custom/user';

@Controller('user')
export class UserController {
    constructor(public userService: UserService, private SharedUserService:SharedUserService) { }
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.SharedUserService.createUser(createUserDto)
    }
    
    @Get()
    async getAllUsers(@Query() queryParams:ListUsersRequest ):Promise<UserListResponseDto> {
        const { data, limit, skip, total } = await this.userService.getAllUsers(queryParams)
        return new UserListResponseDto(data, limit, skip, total);
    }

    @Get('/:id')
    async getUser(@Param() {id}: IdParam):Promise<UserResponseDto> {
        const user = await this.userService.getUser(id)
        return new UserResponseDto(user)
    }

    @Patch('/:id')
    @UseGuards(JwtAuthGuard)
    updateUser(@Param() {id}: IdParam, @Body() updateUserDto: UpdateUserDto,@Req() req:AppRequest) {
        if(id !== req.user.userId){
            throw new UnauthorizedException()
        }
        return this.userService.updateUser(id, updateUserDto)
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    deleteUser(@Param() {id}: IdParam,@Req() req:AppRequest) {
        if(id !== req.user.userId){
            throw new UnauthorizedException()
        }
        return this.userService.deleteUser(id)
    }
}
