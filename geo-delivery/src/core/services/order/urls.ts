import { OrderSearchParams } from 'types';

const API = process.env.REACT_APP_API_HOST_URL;

export const ORDER_URL = `${API}/order`;

export const ORDER_TOTAL_URL = `${ORDER_URL}/total`;

export const ORDER_ID_URL = (deliveryId: string) => `${ORDER_URL}/id/${deliveryId}`;

// @ts-ignore
export const ORDER_SEARCH_URL = (params: OrderSearchParams) => `${ORDER_URL}?${new URLSearchParams(params).toString()}`;