import { CategoryDetail } from './categories';
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
};

export type MainState = {
  init: InitState | undefined;
  loading: boolean;
  pageSize: number;
  globalModalConfig: GlobalModalConfig,
}


export type ProviderProps = [
  MainState,
  React.Dispatch<Actions>,
];