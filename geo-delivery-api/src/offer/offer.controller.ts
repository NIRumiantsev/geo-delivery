import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { OfferCreateDto } from './dto';
import { OfferSearchParams } from './types';
import { OfferService } from './offer.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserService } from '../user/user.service';
import { OrderService } from '../order/order.service';
import { DeliveryService } from '../delivery/delivery.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationCreateDto } from '../notification/dto';
import {
  OFFER_NOT_FOUND,
  OFFER_TARGET_NOT_FOUND_ERROR,
  OFFER_CREATED_NOTIFICATION,
  OFFER_ACCEPTED_NOTIFICATION,
  OFFER_DECLINED_NOTIFICATION,
} from './offer.constants';

@Controller('offer')
export class OfferController {
  constructor(
    private readonly offerService: OfferService,
    private readonly userService: UserService,
    private readonly orderService: OrderService,
    private readonly deliveryService: DeliveryService,
    private readonly notificationService: NotificationService,
  ) {}

  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: OfferCreateDto) {
    const { senderId, addresseeId, targetId, targetType } = dto;
    await this.userService.checkUserExists(senderId);
    await this.userService.checkUserExists(addresseeId);
    const currentTarget = await this.orderService.get(targetId) || await this.deliveryService.get(targetId);
    if (!currentTarget) {
      throw new UnauthorizedException(OFFER_TARGET_NOT_FOUND_ERROR(targetType));
    }
    const notificationData: NotificationCreateDto = { userId: addresseeId, content: OFFER_CREATED_NOTIFICATION(targetType), status: 'error' };
    await this.notificationService.create(notificationData)
    return this.offerService.create(dto);
  }

  @UseGuards(JwtGuard)
  @Get(':offerId')
  async get(@Param('offerId') offerId: string) {
    return this.offerService.get(offerId);
  }

  @UseGuards(JwtGuard)
  @Delete(':offerId')
  async delete(@Param('offerId') offerId: string) {
    return this.offerService.delete(offerId);
  }

  @UseGuards(JwtGuard)
  @Put(':offerId')
  async accept(@Param('offerId') offerId: string) {
    const offer = await this.offerService.get(offerId);
    if (!offer) {
      throw new UnauthorizedException(OFFER_NOT_FOUND);
    }
    const notificationData: NotificationCreateDto = { userId: offer.addresseeId, content: OFFER_ACCEPTED_NOTIFICATION, status: 'error' };
    await this.notificationService.create(notificationData)
    return this.offerService.accept(offerId);
  }

  @UseGuards(JwtGuard)
  @Put(':offerId')
  async decline(@Param('offerId') offerId: string) {
    const offer = await this.offerService.get(offerId);
    if (!offer) {
      throw new UnauthorizedException(OFFER_NOT_FOUND);
    }
    const notificationData: NotificationCreateDto = { userId: offer.addresseeId, content: OFFER_DECLINED_NOTIFICATION, status: 'error' };
    await this.notificationService.create(notificationData)
    return this.offerService.decline(offerId);
  }

  @UseGuards(JwtGuard)
  @Get('find')
  async find(@Query() query: OfferSearchParams) {
    return this.offerService.find(query);
  }
}
