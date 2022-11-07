const API = process.env.REACT_APP_API_HOST_URL;

export const SEARCH_URL = `${API}/search`;

export const SEARCH_CITY_URL = (input: string) => `${SEARCH_URL}/cities?input=${input}`;