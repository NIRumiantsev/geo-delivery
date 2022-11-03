import { DeliverySearchParams } from 'types';

const API = process.env.REACT_APP_API_HOST_URL;

export const DELIVERY_URL = `${API}/delivery`;

export const DELIVERY_TOTAL_URL = `${DELIVERY_URL}/total`;

// @ts-ignore
export const DELIVERY_SEARCH_URL = (params: DeliverySearchParams) => `${DELIVERY_URL}?${new URLSearchParams(params).toString()}`;