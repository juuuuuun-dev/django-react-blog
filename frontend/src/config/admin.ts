import React from 'react';
import Dashboard from '../pages/admin/Dashboard';
import Profile from '../pages/admin/Profile';
import Tags from '../pages/admin/tags/Index';
import TagEdit from '../pages/admin/tags/TagEdit';
import TagCreate from '../pages/admin/tags/TagCreate';

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
    path: '/admin/profile',
    title: 'Profile',
    component: Profile,
  },
];

export const adminPathList = navList.map((value) => {
  return value.path;
});