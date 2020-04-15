import { ITagList } from '../types/tags'
import { ICategoriesList } from '../types/categories'
export interface IPostData {
  id?: number;
  key?: number;
  title: string;
  content: string;
  is_show?: boolean;
  category: ICategoriesList;
  tag: ITagList[],
  updated_at?: string;
  created_at?: string;
}

export interface IPostListData {
  id?: number;
  title: string;
  plain_content: string;
  category: ICategoriesList;
  tag: ITagList[],
  updated_at: string;
  created_at: string;
}

export interface IPostFormItem {
  tags: ITagList[];
  categories: ICategoriesList[]
}