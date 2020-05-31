import { AxiosResponse } from 'axios';

export const tagList = [
  {
    "id": 1,
    "name": "test tag",
  },
  {
    "id": 2,
    "name": "test tag2",
  }
];
export const categoryList = [
  {
    id: 1,
    name: "category test",
  },
  {
    id: 2,
    name: "category test2",
  },
]

export const resultData = {
  "id": 1,
  "key": 1,
  "title": "test Abe",
  "cover": "http://localhost:3000/image.jpg",
  "content": "content Abe",
  "is_show": true,
  "category": categoryList[0].id,
  "tag": [
    tagList[0].id,
  ],
  "created_at": "2020-02-02",
  "updated_at": "2020-02-02",
}

export const resultData2 = {
  "id": 2,
  "key": 2,
  "title": "test Asou",
  "content": "content Asou",
  "is_show": true,
  "category": categoryList[1].id,
  "tag": [
    tagList[1].id,
  ],
  "created_at": "2020-02-03",
  "updated_at": "2020-02-03",
}

export const listData = {
  "count": 1,
  "results": [resultData, resultData2],
  "tags": tagList,
  "categories": categoryList,
}

export const updateResultData = {
  "id": 1,
  "key": 1,
  "name": "updateAbe",
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
    title: ["The title already exists"]
  },
  status: 400,
  statusText: '400 Bad Request',
  config: {},
  headers: {},
};


export const detailAxiosResponse: AxiosResponse = {
  data: {
    post: resultData,
    tags: tagList,
    categories: categoryList,
  },
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
export const formItemAxiosResponse: AxiosResponse = {
  data: {
    categories: categoryList,
    tags: tagList,
  },
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