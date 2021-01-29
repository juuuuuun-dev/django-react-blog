import React from 'react';

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
    component: React.lazy(() => import("../pages/Main")),
    exact: true,
  },
  {
    path: '/posts/:slug/',
    title: 'Post',
    component: React.lazy(() => import("../pages/posts/detail")),
    hiddenNav: true,
  },
  {
    path: '/categories/:slug/',
    title: 'Categories',
    component: React.lazy(() => import("../pages/categories/index")),
  },
  {
    path: '/tags/:slug/',
    title: 'Tags',
    component: React.lazy(() => import("../pages/tags/index")),
  },
  {
    path: '/about/',
    title: 'About me',
    component: React.lazy(() => import("../pages/about/index")),
  },

];

export const mainPathList = navList.map(value => {
  return value.path;
});
