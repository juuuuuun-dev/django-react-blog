import { InitState } from '../types/mainContext';
import { PostDetail } from '../types/posts';

export type CreateLdJsonTypeWebSiteArg = {
  init: InitState | undefined,
}

export type CreateLdJsonTypeBlogPostingArg = {
  init: InitState | undefined,
  post: PostDetail,
}

export type BreadcrumbList = {
  position: number,
  name: string,
  item: string,
}[]

