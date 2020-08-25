import { CategoryDetail, CategoryList } from './categories';
import { ListQuery, Pagination } from './pagination';
import { TagDetail, TagList } from './tags';

export type PostDetail = {
  id?: number;
  key?: number;
  title: string;
  slug: string;
  content: string;
  cover?: string;
  thumb?: string;
  is_show?: boolean;
  plain_content?: string;
  category: number;
  tag: TagDetail[],
  updated_at?: string;
  created_at?: string;
}

export type PostList = Pagination & {
  results: PostDetail[],
  tags: TagDetail[],
  categories: CategoryDetail[],
  tag_name?: string;
  category_name?: string;
} | undefined;

export type PostListProps = {
  data: PostList;
  query: ListQuery;
  handlePageChange: (page: number, pageSize?: number | undefined) => void
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
  }
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