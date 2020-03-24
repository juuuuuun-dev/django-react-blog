import React from 'react';
import Dashboard from '../pages/admin/Dashboard';
import Profile from '../pages/admin/Profile';
import Tags from '../pages/admin/tags/Index';

interface INavList {
  path: string;
  title: string;
  component: React.FC;
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
  },
  {
    path: '/admin/profile',
    title: 'Profile',
    component: Profile,
  },
];
