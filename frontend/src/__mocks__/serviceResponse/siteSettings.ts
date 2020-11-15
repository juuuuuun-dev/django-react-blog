import { AxiosResponse } from 'axios';

export const resultData = {
  public_name: 'test',
  avator: "http://localhost:3000/test.jpg",
  message: "test message",
  url: "http://localhost:3001/",
}

export const updateResultData = {
  username: "update",
  profile: {
    avator: "http://localhost:3000/test.jpg",
    message: "update message",
    url: "http://localhost:3001/",
    email: "test@test.com",
  },
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