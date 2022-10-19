import { inject, injectable } from 'inversify';
import { identifiers } from 'core';
import { AuthStore, authStore } from 'core/stores';
import { ApiService } from 'core/services';
import { AuthDto, AuthResponseDto } from 'types';
import { AUTH_URL } from './urls';

@injectable()
export class AuthService {
  private readonly authStore: AuthStore;
  private readonly apiService: ApiService;

  constructor(@inject(identifiers.API_SERVICE) apiService: ApiService) {
    this.authStore = authStore;
    this.apiService = apiService;
  }

  async login(dto: AuthDto) {
    const { access_token } = await this.apiService.post<AuthResponseDto, AuthDto>(AUTH_URL, dto);
    this.authStore.token = access_token;
    this.apiService.updateAxiosInstance();
  }
}