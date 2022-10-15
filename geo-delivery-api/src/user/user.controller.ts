import { Controller, Post, Body, UsePipes, ValidationPipe, BadRequestException } from "@nestjs/common";
import { LOGIN_ALREADY_EXIST_ERROR } from './user.constants';
import { UserService } from './user.service';
import { UserCreateDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: UserCreateDto) {
    const oldUser = await this.userService.findUser(dto.login);
    if (oldUser) {
      throw new BadRequestException(LOGIN_ALREADY_EXIST_ERROR);
    }
    return this.userService.createUser(dto);
  }
}
