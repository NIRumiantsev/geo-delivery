import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(JwtGuard)
  @Get('user/:userId')
  getAllBuUserId(@Param('userId') userId: string) {
    return this.notificationService.getAllByUserId(userId);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notificationService.delete(id);
  }

  @UseGuards(JwtGuard)
  @Delete('user/:userId')
  deleteAllBuUserId(@Param('userId') userId: string) {
    return this.notificationService.deleteAllByUserId(userId);
  }
}
