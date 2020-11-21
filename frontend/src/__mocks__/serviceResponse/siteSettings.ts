import { AxiosResponse } from 'axios';

export const resultData = {
  name: 'test',
  description: "test message",
  logo: "http://localhost:3000/test.jpg",
  main_image: "http://localhost:3000/test_main.jpg",
}

export const confitData = {
  logo_size: {
    width: 100,
    height: 100,
  },
  main_image_size: {
    width: 100,
    height: 100,
  }
}

export const updateResultData = {
  name: "update",
  description: "test message",
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
    name: ["The name already exists"]
  },
  status: 400,
  statusText: '400 Bad Request',
  config: {},
  headers: {},
};


export const detailAxiosResponse: AxiosResponse = {
  data: {
    data: resultData,
    config: confitData,
  },
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