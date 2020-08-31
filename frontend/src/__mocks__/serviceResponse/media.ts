import { AxiosResponse } from 'axios';

export const resultData = {
  "id": 1,
  "key": 1,
  "name": "test Abe",
  "file": "http://localhost:3000/image.jpg",
  "thumb": "http://localhost:3000/thumb.jpg",
  "cover": "http://localhost:3000/cover.jpg",
  "created_at": "2020-02-02",
  "updated_at": "2020-02-02",
}

export const resultData2 = {
  "id": 2,
  "key": 2,
  "name": "testAsou",
  "file": "http://localhost:3000/image2.jpg",
  "thumb": "https://placekitten.com/100/50",
  "created_at": "2020-02-03",
  "updated_at": "2020-02-03",
}

export const listData = {
  "count": 1,
  "results": [resultData, resultData2]
}

export const updateResultData = {
  "id": 1,
  "key": 1,
  "name": "updateAbe",
  "file": "http://localhost:3010/image.jpg",
  "thumb": "http://localhost:3010/thumb.jpg",
  "created_at": "2020-02-02",
  "updated_at": "2020-02-03",
}


export const listAxiosResponse: AxiosResponse = {
  data: listData,
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

export const detailAxiosResponse: AxiosResponse = {
  data: resultData,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
}
export const createAxiosResponse: AxiosResponse = {
  data: resultData,
  status: 201,
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