import React from 'react';

import {
    EditOutlined, FileImageOutlined, FolderOpenOutlined, SettingOutlined, TagOutlined
} from '@ant-design/icons';

interface INavList {
  id?: string;
  path: string;
  title: string;
  component: React.FC;
  exact?: boolean;
  hiddenNav?: boolean;
  parentId?: string;
  group?: string;
  icon?: any;
}

interface IGroupNavList {
  id: string;
  title: string;
  icon: any
}

export const groupNavList: IGroupNavList[] = [
  {
    id: "setting",
    title: "Setting",
    icon: SettingOutlined,
  },
]

export const navList: INavList[] = [
  {
    id: 'dashboard',
    path: '/admin/dashboard',
    title: 'Dashboard',
    component: React.lazy(() => import("../pages/admin/Dashboard")),
  },
  {
    id: 'posts',
    path: '/admin/posts',
    title: 'Posts',
    component: React.lazy(() => import("../pages/admin/posts/index")),
    exact: true,
    icon: EditOutlined,
  },
  {
    path: '/admin/posts/:slug/edit',
    title: 'Post edit',
    component: React.lazy(() => import("../pages/admin/posts/edit")),
    hiddenNav: true,
    parentId: 'posts',
  },
  {
    path: '/admin/posts/create',
    title: 'Post create',
    component: React.lazy(() => import("../pages/admin/posts/create")),
    hiddenNav: true,
    parentId: 'posts',
  },
  {
    id: 'media',
    path: '/admin/media',
    title: 'Media',
    component: React.lazy(() => import("../pages/admin/media/index")),
    exact: true,
    icon: FileImageOutlined,
  },
  {
    path: '/admin/media/create',
    title: 'Media create',
    component: React.lazy(() => import("../pages/admin/media/create")),
    hiddenNav: true,
    parentId: 'media',
  },
  {
    path: '/admin/media/:id/edit',
    title: 'Media edit',
    component: React.lazy(() => import("../pages/admin/media/edit")),
    hiddenNav: true,
    parentId: 'media',
  },
  {
    id: 'tags',
    path: '/admin/tags',
    title: 'Tags',
    component: React.lazy(() => import("../pages/admin/tags/index")),
    exact: true,
    icon: TagOutlined,
  },
  {
    path: '/admin/tags/:id/edit',
    title: 'Tag edit',
    component: React.lazy(() => import("../pages/admin/tags/edit")),
    hiddenNav: true,
    parentId: 'tags',
  },
  {
    path: '/admin/tags/create',
    title: 'Tag create',
    component: React.lazy(() => import("../pages/admin/tags/create")),
    hiddenNav: true,
    parentId: 'tags',
  },
  {
    id: 'categories',
    path: '/admin/categories',
    title: 'Categories',
    component: React.lazy(() => import("../pages/admin/categories/index")),
    exact: true,
    icon: FolderOpenOutlined,
  },
  {
    path: '/admin/categories/:id/edit',
    title: 'Category edit',
    component: React.lazy(() => import("../pages/admin/categories/edit")),
    hiddenNav: true,
    parentId: 'categories',
  },
  {
    path: '/admin/categories/create',
    title: 'Category create',
    component: React.lazy(() => import("../pages/admin/categories/create")),
    hiddenNav: true,
    parentId: 'categories',
  },
  {
    id: 'profile',
    group: 'setting',
    path: '/admin/profile',
    title: 'Public profile',
    component: React.lazy(() => import("../pages/admin/Profile")),
  },
  {
    id: 'aboutMe',
    group: 'setting',
    path: '/admin/about-me',
    title: 'About me',
    component: React.lazy(() => import("../pages/admin/AboutMe")),
  },
  {
    id: 'siteSettings',
    group: 'setting',
    path: '/admin/site-settings',
    title: 'Site settings',
    component: React.lazy(() => import("../pages/admin/SiteSettings")),
  },
];

export const adminPathList = navList.map(value => {
  return value.path;
});
