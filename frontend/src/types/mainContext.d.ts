import { CategoryDetail } from './categories';
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
  loading: boolean;
  domain: string;
  copyrightStartYear: number;
  pageSize: number;
  globalModalConfig: GlobalModalConfig,
}


export type ProviderProps = [
  MainState,
  React.Dispatch<Actions>,
];