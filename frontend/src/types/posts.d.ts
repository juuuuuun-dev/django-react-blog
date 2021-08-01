import { at } from 'lodash';

import { CategoryDetail, CategoryList } from './categories';
import { ListQuery, Pagination } from './pagination';
import { TagDetail, TagList } from './tags';

export type PostCoverMedia = {
  id: number | undefined;
  cover: string | undefined;
  cover_mini: string | undefined;
}

export type PostDetail = {
  id?: number;
  key?: number;
  title: string;
  slug: string;
  content: string;
  cover_media: PostCoverMedia;
  thumb?: string;
  is_show?: boolean;
  plain_content?: string;
  category: CategoryDetail;
  tag: TagDetail[],
  updated_at?: string;
  created_at?: string;
}


export type PostList = Pagination & {
  results: PostDetail[];
  tags: TagDetail[];
  categories: CategoryDetail[];
  tag_name?: string;
  category_name?: string;
  links: {
    next?: string;
    previous?: string;
  },
  media_size: {
    cover: ImageSize;
  }
  count: number;
} | undefined;


export type PostListProps = {
  data: PostDetail[];
  loading: boolean;
  media_size: MediaSize;
  showDate: boolean;
  descriptionRows: number;
}


export type PostListTemplateProps = {
  data: PostList;
  query: ListQuery;
  handlePageChange: (page: number, pageSize?: number | undefined) => void;
}

export type ImageSize = {
  width: number;
  height: number;
}

export type MediaSize = {
  cover: ImageSize;
} | undefined;

export type EntryDataProps = {
  post: PostDetail;
  showUpdateAt?: boolean;
  showCategory?: boolean;
  showTag?: boolean;
}

export type PostFormItem = {
  tags: TagDetail[];
  categories: CategoryDetail[]
}

export type PostFormProps = {
  data?: PostDetail;
  formItem?: PostFormItem;
  onSubmit: (values: any) => Promise<void>;
  error?: {
    title?: Array<string>,
    slug?: Array<string>,
  },
  isStaff?: Boolean;
}

export type PostDetailProps = {
  post: PostDetail;
}


export type PostPreviewProps = {
  title: string;
  content: string;
  cover?: string;
}

export type PostListPageCountResultsProps = {
  query: ListQuery
  count: number | undefined,
}

export type PostListTilteProps = {
  title: string;
  subTitle: string | undefined;
}

export type PostHorizonalAdsProps = {
  slot: string | undefined;
}