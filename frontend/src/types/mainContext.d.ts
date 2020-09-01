import { CategoryDetail } from './categories';
import { MetaType } from './meta';
import { PostDetail } from './posts';
import { ProfileDetail } from './profile';
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
  description: string;
  meta: MetaType,
  loading: boolean;
  domain: string;
  url: string;
  copyrightStartYear: number;
  pageSize: number;
  globalModalConfig: GlobalModalConfig,
  dateFormat: string,
  dateTimeFormat: string,
}


export type ProviderProps = [
  MainState,
  React.Dispatch<Actions>,
];