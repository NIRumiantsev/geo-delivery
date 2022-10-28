import { inject, injectable } from 'inversify';
import { identifiers } from 'core';
import { AuthStore, authStore } from 'core/stores';
import { ApiService, StorageService, UserService, USER_LOGIN, USER_PASSWORD } from 'core/services';
import { AuthDto, AuthResponseDto } from 'types';
import { AUTH_URL } from './urls';

@injectable()
export class AuthService {
  private readonly authStore: AuthStore;
  private readonly apiService: ApiService;
  private readonly storageService: StorageService;
  private readonly userService: UserService;

  constructor(
    @inject(identifiers.API_SERVICE) apiService: ApiService,
    @inject(identifiers.STORAGE_SERVICE) storageService: StorageService,
    @inject(identifiers.USER_SERVICE) userService: UserService,
  ) {
    this.authStore = authStore;
    this.apiService = apiService;
    this.storageService = storageService;
    this.userService = userService;
  }

  async login(dto: AuthDto) {
    const { login, password } = dto;
    const { access_token } = await this.apiService.post<AuthResponseDto, AuthDto>(AUTH_URL, dto);
    this.authStore.token = access_token;
    this.apiService.updateAxiosInstance();
    await this.userService.getUserByLogin(login);
    this.storageService.setCookieItem(USER_LOGIN, login);
    this.storageService.setCookieItem(USER_PASSWORD, password);
  }

  async checkLogin() {
    const login = this.storageService.getCookieItem(USER_LOGIN);
    const password = this.storageService.getCookieItem(USER_PASSWORD);
    if (login && password) {
      await this.login({ login, password });
      await this.userService.getUserByLogin(login);
    }
  }

  logout() {
    this.storageService.clearCookie();
    this.authStore.token = '';
    this.apiService.updateAxiosInstance();
    this.userService.removeCurrentUser();
  }
}