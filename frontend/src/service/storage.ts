import { get, set } from 'local-storage';

export const getToken = () => {
  return get<string>('token');
};

export const setStorageToken = (token: string) => {
  console.log(token);
  return set<string>('token', token);
};

export const getRefresh = () => {
  return get<string>('refresh');
};
