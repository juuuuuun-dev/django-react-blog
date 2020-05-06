import { AxiosResponse } from 'axios';

export const deleteAxiosResponse: AxiosResponse = {
  data: {},
  status: 204,
  statusText: 'delete',
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

export const error500AxiosResponse: AxiosResponse = {
  data: {},
  status: 500,
  statusText: 'ERROR',
  config: {},
  headers: {},
};
