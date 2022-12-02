import { OfferTypes } from './types';

enum OFFER_TYPE_TEXT {
  'order' = 'Заказ',
  'delivery' = 'Поездка',
}

export const OFFER_NOT_FOUND = 'Предложение не найдено!';

export const OFFER_TARGET_NOT_FOUND_ERROR = (type: string) => `Такой(ая) ${OFFER_TYPE_TEXT[type]} не найден(а)!`;

export const OFFER_CREATED_NOTIFICATION = (type: string) => `Вы получили ${OFFER_TYPE_TEXT[type]} от пользователя`;

export const OFFER_ACCEPTED_NOTIFICATION = 'Пользователь принял ваше предложение';

export const OFFER_DECLINED_NOTIFICATION = 'Пользователь отклонил ваше предложение';