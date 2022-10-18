import { inject, injectable } from 'inversify';
import { UserDto } from 'types';
import { identifiers } from 'core/constants';
import { userStore, UserStore } from 'core/stores';
import { ApiService } from 'core/services';
import { USER_ID_URL } from './urls';

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
}