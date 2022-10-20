const API = process.env.REACT_APP_API_HOST_URL;

export const USER_URL = `${API}/user`;

export const USER_REGISTER_URL =`${USER_URL}/register`;

export const USER_ID_URL = (userId: string) => {
  return `${USER_URL}/${userId}`
};

export const USER_ID_INFO_URL = (userId: string) => {
  return `${USER_ID_URL(userId)}/info`
};