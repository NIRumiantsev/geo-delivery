import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  UseGuards,
  ValidationPipe,
  BadRequestException,
} from "@nestjs/common";
import { JwtGuard } from '../auth/guards/jwt.guard';
import { LOGIN_ALREADY_EXIST_ERROR } from './user.constants';
import { UserService } from './user.service';
import { UserCreateDto, UserInfoDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: UserCreateDto) {
    const oldUser = await this.userService.findUserByLogin(dto.login);
    if (oldUser) {
      throw new BadRequestException(LOGIN_ALREADY_EXIST_ERROR);
    }
    return this.userService.createUser(dto);
  }

  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe())
  @Put(':userId')
  async updateUser(@Param('userId') userId: string, @Body() dto: UserCreateDto) {
    await this.userService.checkUserExists(userId);
    return await this.userService.updateUser(userId, dto);
  }

  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe())
  @Put(':userId/info')
  async updateUserInfo(@Param('userId') userId: string, @Body() dto: UserInfoDto) {
    await this.userService.checkUserExists(userId);
    return await this.userService.updateUserInfo(userId, dto);
  }

  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe())
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    await this.userService.checkUserExists(userId);
    return await this.userService.deleteUser(userId);
  }
}
