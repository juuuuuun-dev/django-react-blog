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
  "slug": "test-abe",
  "cover_media": {
    "id": 1,
    "cover": "http://localhost:3000/image.jpg",
  },
  "content": "content Abe",
  "is_show": true,
  "category": categoryList[0],
  "tag": [
    tagList[0],
  ],
  "created_at": "2020-02-02",
  "updated_at": "2020-02-02",
}

export const resultData2 = {
  "id": 2,
  "key": 2,
  "title": "test Asou",
  "slug": "test-asou",
  "content": "content Asou",
  "is_show": true,
  "category": categoryList[1],
  "tag": [
    tagList[1],
  ],
  "created_at": "2020-02-03",
  "updated_at": "2020-02-03",
}

export const listData = {
  "count": 2,
  "results": [resultData, resultData2],
  "tags": tagList,
  "categories": categoryList,
}

export const listTagFilterData = {
  "count": 2,
  "results": [resultData, resultData2],
  "tags": tagList,
  "categories": categoryList,
  "tag_name": "test",
}

export const listCategoryFilterData = {
  "count": 2,
  "results": [resultData, resultData2],
  "tags": tagList,
  "categories": categoryList,
  "category_name": "test",
}

export const updateResultData = {
  "id": 1,
  "key": 1,
  "name": "updateAbe",
  "slug": "update-abe",
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

export const listTagFilterAxiosResponse: AxiosResponse = {
  data: listTagFilterData,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};

export const listCategoryFilterAxiosResponse: AxiosResponse = {
  data: listTagFilterData,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};

export const list0ResultAxiosResponse: AxiosResponse = {
  data: {
    count: 0,
    "results": [],
    "tags": tagList,
    "categories": categoryList,
  },
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