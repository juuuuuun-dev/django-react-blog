import { AxiosResponse } from 'axios';

export const refreshTokenData = {
  "access": "token",
}


export const refreshTokenAxiosResponse: AxiosResponse = {
  data: refreshTokenData,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};

export const error404AxiosResponse: AxiosResponse = {
  data: {},
  status: 404,
  statusText: 'ERROR',
  config: {},
  headers: {},
};

export const error400AxiosResponse: AxiosResponse = {
  data: {
    name: ["この項目は必須です。"]
  },
  status: 400,
  statusText: '400 Bad Request',
  config: {},
  headers: {},
};
