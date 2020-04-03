import React from 'react';
import Dashboard from '../pages/admin/Dashboard';
import Profile from '../pages/admin/Profile';
import Tags from '../pages/admin/tags/index';
import TagEdit from '../pages/admin/tags/edit';
import TagCreate from '../pages/admin/tags/create';
import Categories from '../pages/admin/categories/index';
import CategoryEdit from '../pages/admin/categories/edit';
import CategoryCreate from '../pages/admin/categories/create';

interface INavList {
  path: string;
  title: string;
  component: React.FC;
  exact?: boolean;
  hiddenNav?: boolean;
}

export const navList: INavList[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/admin/tags',
    title: 'Tags',
    component: Tags,
    exact: true,
  },
  {
    path: '/admin/tags/:id/edit',
    title: 'TagEdit',
    component: TagEdit,
    hiddenNav: true,
  },
  {
    path: '/admin/tags/create',
    title: 'TagCreate',
    component: TagCreate,
    hiddenNav: true,
  },
  {
    path: '/admin/categories',
    title: 'Categories',
    component: Categories,
    exact: true,
  },
  {
    path: '/admin/categoeis/:id/edit',
    title: 'Category edit',
    component: CategoryEdit,
    hiddenNav: true,
  },
  {
    path: '/admin/categories/create',
    title: 'Categoreis create',
    component: CategoryCreate,
    hiddenNav: true,
  },
  {
    path: '/admin/profile',
    title: 'Profile',
    component: Profile,
  },
];

export const adminPathList = navList.map((value) => {
  return value.path;
});