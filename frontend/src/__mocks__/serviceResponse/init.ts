import { AxiosResponse } from 'axios';

import { resultData as postData, resultData2 as postData2 } from './posts';

export const tagList = [
  {
    "id": 1,
    "name": "test tag",
    "slug": "test-tag"
  },
  {
    "id": 2,
    "name": "test tag2",
    "slug": "test-tag2",
  }
];
export const categoryList = [
  {
    id: 1,
    name: "category test",
    slug: "category-test",
  },
  {
    id: 2,
    name: "category test2",
    slug: "category-test2",
  },
]

export const siteSettings = {
  title: process.env.REACT_APP_TITLE,
  description: "Test description",
  mainImage: "main.jpg",
  logo: "logo.jpg",
}


export const initData = {
  author: {
    "public_name": "Abe",
    "message": "Test message",
  },
  recent_posts: [postData, postData2],
  tags: tagList,
  categories: categoryList,
  site_settings: siteSettings,
}


export const initAxiosResponse: AxiosResponse = {
  data: initData,
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
