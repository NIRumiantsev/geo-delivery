import { inject, injectable } from 'inversify';
import { identifiers } from 'core';
import { ApiService } from 'core/services'
import { AutoCreateDto } from 'types';
import { AUTO_CREATE_URL } from './urls';

@injectable()
export class AutoService {
  private apiService: ApiService;

  constructor(
    @inject(identifiers.API_SERVICE) apiService: ApiService,
  ) {
    this.apiService = apiService;
  }

  async createUserAutoList(dto: AutoCreateDto[]) {
    return await this.apiService.post<string[], AutoCreateDto[]>(AUTO_CREATE_URL, dto);
  }
}