import React from 'react';

import Categories from '../pages/categories/index';
import Index from '../pages/Main';
import PostDetail from '../pages/posts/detail';

interface INavList {
  path: string;
  title: string;
  component: React.FC;
  exact?: boolean;
  hiddenNav?: boolean;
}

export const navList: INavList[] = [
  {
    path: '/',
    title: 'Home',
    component: Index,
    exact: true,
  },
  {
    path: '/posts/:id/',
    title: 'Post',
    component: PostDetail,
    hiddenNav: true,
  },
  {
    path: '/categories/:slug/',
    title: 'Categories',
    component: Categories,
  },

];

export const mainPathList = navList.map(value => {
  return value.path;
});
