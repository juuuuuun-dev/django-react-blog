import React from 'react';
import Dashboard from '../pages/admin/Dashboard';
import Profile from '../pages/admin/Profile';

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
    path: '/admin/profile',
    title: 'Profile',
    component: Profile,
  },
];
