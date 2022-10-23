import { inject, injectable } from 'inversify';
import { UserCreateDto, UserDto, UserInfoDto } from 'types';
import { identifiers } from 'core/constants';
import { userStore, UserStore } from 'core/stores';
import { ApiService } from 'core/services';
import { USER_ID_URL, USER_LOGIN_URL, USER_ID_INFO_URL, USER_REGISTER_URL } from './urls';

@injectable()
export class UserService {
  private userStore: UserStore;
  private apiService: ApiService;

  constructor(
    @inject(identifiers.API_SERVICE) apiService: ApiService,
  ) {
    this.userStore = userStore;
    this.apiService = apiService;
  }

  async getUser(userId: string) {
    this.userStore.user = await this.apiService.get<UserDto>(USER_ID_URL(userId));
  }

  async getUserByLogin(userLogin: string) {
    this.userStore.user = await this.apiService.get<UserDto>(USER_LOGIN_URL(userLogin));
  }

  async createUser(dto: UserCreateDto) {
    this.userStore.user = await this.apiService.post<UserDto, UserCreateDto>(USER_REGISTER_URL, dto);
  }

  async updateUserInfo(userId: string, dto: UserInfoDto) {
    this.userStore.user = await this.apiService.put<UserDto, UserInfoDto>(USER_ID_INFO_URL(userId), dto);
  }
}