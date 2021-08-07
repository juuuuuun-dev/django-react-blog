import { InitState } from '../types/mainContext';
import { PostDetail } from '../types/posts';

export type CreateJsonLdTypeWebSiteArg = {
  init: InitState | undefined,
}

export type CreateJsonLdTypeBlogPostingArg = {
  init: InitState | undefined,
  post: PostDetail,
}

export type BreadcrumbList = {
  "position": number,
  "@type": string,
  "item": {
    "@type": string,
    "id": string,
    "name": string,
  },
}[]

