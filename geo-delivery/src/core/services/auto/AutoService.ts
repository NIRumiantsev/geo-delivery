import { inject, injectable } from 'inversify';
import { identifiers } from 'core';
import { ApiService } from 'core/services'
import { AutoStore, autoStore } from 'core/stores';
import { AutoCreateDto, AutoDto } from 'types';
import { AUTO_URL, AUTO_ID_URL, AUTO_LIST_USER_URL } from './urls';

@injectable()
export class AutoService {
  private autoStore: AutoStore

  constructor(@inject(identifiers.API_SERVICE) private readonly apiService: ApiService,) {
    this.autoStore = autoStore;
  }

  async createUserAutoList(dto: AutoCreateDto[]) {
    return await this.apiService.post<string[], AutoCreateDto[]>(AUTO_URL, dto);
  }

  async getUserAutoList(userId: string) {
    this.autoStore.autoList = await this.apiService.get<AutoDto[]>(AUTO_LIST_USER_URL(userId));
  }

  async getAutoById(autoId: string) {
    return await this.apiService.get<AutoDto>(AUTO_ID_URL(autoId));
  }
}