import { CategoryDetail } from './categories';
import { MetaType } from './meta';
import { PostDetail } from './posts';
import { ProfileDetail } from './profile';
import { SiteSettings } from './siteSettings';
import { TagDetail } from './tags';

export type GlobalModalConfig = {
  title: string | null,
  type: string | null,
  content: string | null,
}

export type InitState = {
  author: ProfileDetail,
  categories: CategoryDetail[],
  tags: TagDetail[],
  recentPosts: PostDetail[],
  siteSettings: SiteSettings,
  pageSize: number;
  url: string,
};


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
  meta: MetaType,
  ldJson: [],
  loading: boolean;
  copyrightStartYear: number;
  globalModalConfig: GlobalModalConfig,
  dateFormat: string,
  dateTimeFormat: string,
}


export type ProviderProps = [
  MainState,
  React.Dispatch<Actions>,
];