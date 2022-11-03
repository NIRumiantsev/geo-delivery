import "reflect-metadata";
import { Container } from "inversify";
import { identifiers } from './constants';
import {
  ApiService,
  StorageService,
  UserService,
  LoggerService,
  AuthService,
  AutoService,
  DeliveryService,
  OrderService,
} from './services';

let container = new Container();

container.bind<LoggerService>(identifiers.LOGGER_SERVICE).to(LoggerService);
container.bind<ApiService>(identifiers.API_SERVICE).to(ApiService);
container.bind<UserService>(identifiers.USER_SERVICE).to(UserService);
container.bind<StorageService>(identifiers.STORAGE_SERVICE).to(StorageService);
container.bind<AuthService>(identifiers.AUTH_SERVICE).to(AuthService);
container.bind<AutoService>(identifiers.AUTO_SERVICE).to(AutoService);
container.bind<DeliveryService>(identifiers.DELIVERY_SERVICE).to(DeliveryService);
container.bind<OrderService>(identifiers.ORDER_SERVICE).to(OrderService);

export { container, identifiers };