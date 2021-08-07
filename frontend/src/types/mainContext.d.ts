import { CategoryDetail } from './categories';
import { MetaType } from './meta';
import { PostDetail } from './posts';
import { ProfileDetail } from './profile';
import { SiteSettingDetail } from './siteSettings';
import { TagDetail } from './tags';

export type InitState = {
  author: ProfileDetail,
  categories: { [key: string]: CategoryDetail },
  tags: TagDetail[],
  recentPosts: PostDetail[],
  siteSettings: SiteSettingDetail,
  pageSize: number;
  url: string,
};

export type BreakPoint = {
  xs: number,
  sm: number,
  md: number,
  lg: number,
  xl: number,
  xxl: number,
}

export type ReceiveInitState = {
  author: ProfileDetail,
  categories: CategoryDetail[],
  tags: TagDetail[],
  recent_posts: PostDetail[],
};

export type MainState = {
  init: InitState | undefined;
  appTitle: string;
  pageTitle: string;
  meta: MetaType;
  jsonLd: [];
  loading: boolean;
  copyrightStartYear: number;
  dateFormat: string;
  dateTimeFormat: string;
  breakPoint: BreakPoint;
  temporaryPostList: PostDetail[];
}


export type ProviderProps = [
  MainState,
  React.Dispatch<Actions>,
];