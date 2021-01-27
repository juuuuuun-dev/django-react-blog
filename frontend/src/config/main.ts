import React from 'react';

import About from '../pages/about/index';
import Categories from '../pages/categories/index';
import Index from '../pages/Main';
import PostDetail from '../pages/posts/detail';
import Tags from '../pages/tags/index';

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
    path: '/posts/:slug/',
    title: 'Post',
    component: PostDetail,
    hiddenNav: true,
  },
  {
    path: '/categories/:slug/',
    title: 'Categories',
    component: Categories,
  },
  {
    path: '/tags/:slug/',
    title: 'Tags',
    component: Tags,
  },
  {
    path: '/about/',
    title: 'About me',
    component: About,
  },

];

export const mainPathList = navList.map(value => {
  return value.path;
});
