import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Delete,
  UseGuards,
  UsePipes,
  HttpCode,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { AutoService } from './auto.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AutoDto } from './dto';
import { UserService } from '../user/user.service';
import { AUTO_NOT_FOUND_ERROR } from './auto.constants';

@Controller('auto')
export class AutoController {
  constructor(
    private readonly autoService: AutoService,
    private readonly userService: UserService
  ) {}

  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: AutoDto[]) {
    return await this.autoService.createAuto(dto);
  }

  @Get(':autoId')
  @HttpCode(200)
  async getAuto(@Param('autoId') autoId: string) {
    const auto = this.autoService.getAutoById(autoId);
    if (!auto) {
      throw new NotFoundException(AUTO_NOT_FOUND_ERROR);
    }
    return auto;
  }

  @Get('user/:userId')
  @HttpCode(200)
  async getUserAutoList(@Param('userId') userId: string) {
    await this.userService.checkUserExists(userId);
    return this.autoService.getUserAutoList(userId);
  }

  @UseGuards(JwtGuard)
  @Delete(':autoId')
  async deleteAuto(@Param('autoId') autoId: string) {
    const auto = this.autoService.deleteAutoById(autoId);
    if (!auto) {
      throw new NotFoundException(AUTO_NOT_FOUND_ERROR);
    }
  }
}
