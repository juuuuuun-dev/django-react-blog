import { AxiosResponse } from 'axios';

export const resultData = {
  page_title: 'test',
  description: "test message",
}

export const updateResultData = {
  page_title: "update",
  description: "update description"
}


export const error404AxiosResponse: AxiosResponse = {
  data: {},
  status: 404,
  statusText: 'ERROR',
  config: {},
  headers: {},
};

export const error400AxiosResponse: AxiosResponse = {
  data: {
    name: ["error"]
  },
  status: 400,
  statusText: '400 Bad Request',
  config: {},
  headers: {},
};


export const detailAxiosResponse: AxiosResponse = {
  data: resultData,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
}
export const updateAxiosResponse: AxiosResponse = {
  data: updateResultData,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
}