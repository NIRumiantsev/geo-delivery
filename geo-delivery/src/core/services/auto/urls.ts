const API = process.env.REACT_APP_API_HOST_URL;

export const AUTO_URL = `${API}/auto`;

export const AUTO_LIST_USER_URL = (userId: string) => `${AUTO_URL}/user/${userId}`;