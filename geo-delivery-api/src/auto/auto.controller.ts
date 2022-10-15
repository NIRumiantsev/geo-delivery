import { Body, Controller, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AutoService } from './auto.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AutoDto } from './dto';

@Controller('auto')
export class AutoController {
  constructor(private readonly autoService: AutoService) {}

  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: AutoDto[]) {
    return await this.autoService.createAuto(dto);
  }

}
