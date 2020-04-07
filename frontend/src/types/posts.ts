import { ITagData } from '../types/tags'
import { ICategoriesData } from '../types/categories'
export interface IPostData {
  id: number;
  key: number;
  title: string;
  content: string;
  is_show: boolean;
  category: number;
  tag: Array<number>;
  updated_at: string;
  created_at: string;
}

export interface IPostFormItem {
  tags: ITagData[];
  categories: ICategoriesData[]
}