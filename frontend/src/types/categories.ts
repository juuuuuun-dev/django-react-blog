import { IPagination } from "./pagination"

export interface ICategoriesData {
  id: number;
  key: number;
  name: string;
  updated_at: string;
  created_at: string;
}

export interface ICategoryListResult {
  id: number;
  key: number;
  name: string;
  updated_at: string;
  created_at: string;
}

export interface ICategoryList extends IPagination {
  results: ICategoryListResult[]
}