import { Pagination } from './pagination';
import { TagDetail, TagList } from './tags';
import { CategoryList, CategorySimpleDetail, CategoryDetail } from './categories';

export type PostDetail = {
  id?: number;
  key?: number;
  title: string;
  content: string;
  is_show?: boolean;
  plain_content?: string;
  category: CategorySimpleDetail;
  tag: TagDetail[],
  updated_at?: string;
  created_at?: string;
}

export type PostList = Pagination & {
  results: PostDetail[]
}

export type PostFormItem = {
  tags: TagDetail[];
  categories: CategoryDetail[]
}

export type PostFormProps = {
  data?: PostDetail;
  formItem?: PostFormItem;
  onSubmit: (values: any) => Promise<void>;
  onChange: (values: any) => void;
  error?: {
    title?: Array<string>
  }
}

export type PostDetailProps = {
  post: PostDetail;
}

export type PostListProps = {
  posts: PostDetail[] | undefined;
}

export type PostPreviewProps = {
  title: string;
  content: string;
  cover: string;
}