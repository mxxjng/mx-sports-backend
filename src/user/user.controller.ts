import {
    Controller,
    Get,
    Post,
    Param,
    NotFoundException,
    Body,
    Delete,
} from '@nestjs/common';
import { UserLoginDTO, UserRegistrationDTO } from './dto';
import { User } from './user.decorator';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAllUsers() {
        return this.userService.findAll();
    }

    @Get(':id')
    async getSingleUser(@Param('id') id: string) {
        const exercise = await this.userService.findOne(id);

        if (!exercise)
            throw new NotFoundException(
                `Es existiert keine Übung mit der Id: ${id}`,
            );

        return exercise;
    }

    @Get('/auth/user')
    async getAuthenticatedUser(@User('id') userId: string) {
        return await this.userService.getAuthenticatedUser(userId);
    }

    @Post('/login')
    async loginUser(@Body() payLoad: UserLoginDTO) {
        return await this.userService.login(payLoad);
    }

    @Post('/register')
    async registerUser(@Body() payLoad) {
        return await this.userService.register(payLoad);
    }
}
