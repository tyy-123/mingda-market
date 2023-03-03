import { history } from 'umi';
export const TOKEN = 'jstu.token';

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN);
};

export const clearUser = () => {
  localStorage.removeItem(TOKEN);
};

//获取地址栏的token
export const getUrlToken = () => {
  return history.location?.query?.k ?? '';
};
