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
  SearchService,
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
container.bind<SearchService>(identifiers.SEARCH_SERVICE).to(SearchService);

const serviceMap = {
  logger: container.get<LoggerService>(identifiers.LOGGER_SERVICE),
  user: container.get<UserService>(identifiers.USER_SERVICE),
  storage: container.get<StorageService>(identifiers.STORAGE_SERVICE),
  auth: container.get<AuthService>(identifiers.AUTH_SERVICE),
  auto: container.get<AutoService>(identifiers.AUTO_SERVICE),
  delivery: container.get<DeliveryService>(identifiers.DELIVERY_SERVICE),
  order: container.get<OrderService>(identifiers.ORDER_SERVICE),
  search: container.get<SearchService>(identifiers.SEARCH_SERVICE),
};

export { container, identifiers, serviceMap };