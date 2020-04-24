import { IPagination } from "./pagination"
import { ITagListResult } from '../types/tags'
import { ICategoryListResult } from '../types/categories'
export interface IPostData {
  id?: number;
  key?: number;
  title: string;
  content: string;
  is_show?: boolean;
  category: ICategoryListResult;
  tag: ITagListResult[],
  updated_at?: string;
  created_at?: string;
}

export interface IPostListResult {
  id: number;
  title: string;
  plain_content: string;
  category: ICategoryListResult;
  tag: ITagListResult[],
  is_show: boolean;
  updated_at: string;
  created_at: string;
}

export interface IPostList extends IPagination {
  results: IPostListResult[]
}

export interface IPostFormItem {
  tags: ITagListResult[];
  categories: ICategoryListResult[]
}