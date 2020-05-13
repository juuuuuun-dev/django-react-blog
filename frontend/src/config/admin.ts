import React from 'react';
import Dashboard from '../pages/admin/Dashboard';
import Profile from '../pages/admin/Profile';
import Tags from '../pages/admin/tags/index';
import TagEdit from '../pages/admin/tags/edit';
import TagCreate from '../pages/admin/tags/create';
import Categories from '../pages/admin/categories/index';
import CategoryEdit from '../pages/admin/categories/edit';
import CategoryCreate from '../pages/admin/categories/create';
import Posts from '../pages/admin/posts/index';
import PostEdit from '../pages/admin/posts/edit';
import PostCreate from '../pages/admin/posts/create';
import Media from '../pages/admin/media/index';
import MediaCreate from '../pages/admin/media/create';
import MediaEdit from '../pages/admin/media/edit';


interface INavList {
  id?: string;
  path: string;
  title: string;
  component: React.FC;
  exact?: boolean;
  hiddenNav?: boolean;
  parentId?: string;
}

export const navList: INavList[] = [
  {
    id: 'dashboard',
    path: '/admin/dashboard',
    title: 'Dashboard',
    component: Dashboard,
  },
  {
    id: 'posts',
    path: '/admin/posts',
    title: 'Posts',
    component: Posts,
    exact: true,
  },
  {
    path: '/admin/posts/:id/edit',
    title: 'Post edit',
    component: PostEdit,
    hiddenNav: true,
    parentId: 'posts',
  },
  {
    path: '/admin/posts/create',
    title: 'Post create',
    component: PostCreate,
    hiddenNav: true,
    parentId: 'posts',
  },
  {
    id: 'tags',
    path: '/admin/tags',
    title: 'Tags',
    component: Tags,
    exact: true,
  },
  {
    path: '/admin/tags/:id/edit',
    title: 'Tag edit',
    component: TagEdit,
    hiddenNav: true,
    parentId: 'tags',
  },
  {
    path: '/admin/tags/create',
    title: 'Tag create',
    component: TagCreate,
    hiddenNav: true,
    parentId: 'tags',
  },
  {
    id: 'categories',
    path: '/admin/categories',
    title: 'Categories',
    component: Categories,
    exact: true,
  },
  {
    path: '/admin/categories/:id/edit',
    title: 'Category edit',
    component: CategoryEdit,
    hiddenNav: true,
    parentId: 'categories',
  },
  {
    path: '/admin/categories/create',
    title: 'Category create',
    component: CategoryCreate,
    hiddenNav: true,
    parentId: 'categories',
  },
  {
    id: 'media',
    path: '/admin/media',
    title: 'Media',
    component: Media,
    exact: true,
  },
  {
    path: '/admin/media/create',
    title: 'Media create',
    component: MediaCreate,
    hiddenNav: true,
    parentId: 'media',
  },
  {
    path: '/admin/media/:id/edit',
    title: 'Media edit',
    component: MediaEdit,
    hiddenNav: true,
    parentId: 'media',
  },
  {
    id: 'profile',
    path: '/admin/profile',
    title: 'Public profile',
    component: Profile,
  },
];

export const adminPathList = navList.map(value => {
  return value.path;
});
