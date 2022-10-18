import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { get } from 'lodash';
import { inject, injectable } from 'inversify';
import { AuthStore, authStore } from '../../stores';
import { LoggerService } from '../logger';
import { identifiers } from '../../constants';

@injectable()
export class ApiService {
  private axiosInstance: AxiosInstance;
  private loggerService: LoggerService;
  private authStore: AuthStore;

  constructor(@inject(identifiers.LOGGER_SERVICE) loggerService: LoggerService) {
    this.loggerService = loggerService;
    this.authStore = authStore;
    this.axiosInstance = this.createAxiosInstance();
    this.axiosInstance.interceptors.response.use(this.handleSuccess.bind(this), this.handleError.bind(this));
  }

  private createAxiosInstance(): AxiosInstance {
    return axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`,
      }
    })
  }

  private handleSuccess(response: AxiosResponse) {
    return response;
  }

  private handleError(error: AxiosError) {
    this.loggerService.error(get(error, 'response.data.message'));
  }

  updateAxiosInstance() {
    this.axiosInstance = this.createAxiosInstance();
  }

  async get<R>(url: string, config: AxiosRequestConfig = {}) {
    const response = await this.axiosInstance.get<R>(url, { ...this.axiosInstance, ...config });
    return response.data;
  }

  async post<R, D>(url: string, data?: D, config: AxiosRequestConfig = {}) {
    const response = await this.axiosInstance.post<R>(url, data || '', { ...this.axiosInstance, ...config });
    return response.data;
  }

  async put<R, D>(url: string, data?: D, config: AxiosRequestConfig = {}) {
    const response = await this.axiosInstance.put<R>(url, data || '', { ...this.axiosInstance, ...config });
    return response.data;
  }

  async delete<R>(url: string, config: AxiosRequestConfig = {}) {
    const response = await this.axiosInstance.delete<R>(url, { ...this.axiosInstance, ...config });
    return response.data;
  }
}