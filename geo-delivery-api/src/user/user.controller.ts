import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  UsePipes,
  UseGuards,
  ValidationPipe,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtGuard } from '../auth/guards/jwt.guard';
import { LOGIN_ALREADY_EXIST_ERROR, USER_NOT_FOUND_ERROR } from './user.constants';
import { UserService } from './user.service';
import { UserCreateDto, UserInfoDto } from './dto';
import { UserListQueryParams } from './types';

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

  @Get()
  @HttpCode(200)
  async getUserList(@Query() query: UserListQueryParams) {
    return this.userService.getUserList(query);
  }

  @Get(':userId')
  @HttpCode(200)
  async getUserById(@Param('userId') userId: string) {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    return user;
  }

  @Get('login/:login')
  @HttpCode(200)
  async getUserByLogin(@Param('login') login: string) {
    const user = await this.userService.findUserByLogin(login);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    return user;
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
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    await this.userService.checkUserExists(userId);
    return await this.userService.deleteUser(userId);
  }
}
