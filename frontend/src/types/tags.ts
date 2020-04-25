import { IPagination } from "./pagination"
export interface ITagData {
  id: number;
  name: string;
  updated_at: string;
  created_at: string;
}

export interface ITagListResult {
  id: number;
  name: string;
  key: number;
  updated_at: string;
  created_at: string;
}

export interface ITagList extends IPagination {
  results: ITagListResult[]
}

export interface ITextValue {
  text: string;
  value: string;
}