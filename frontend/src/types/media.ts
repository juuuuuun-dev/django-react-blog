import { IPagination } from "./pagination"
export interface IMediaData {
  id?: number;
  name: string;
  file: any;
  updated_at?: string;
  created_at?: string;
}

export interface IMediaListResult extends IMediaData {
  key: number;
  thumb: string;
  updated_at: string;
  created_at: string;
}

export interface IMediaList extends IPagination {
  results: IMediaListResult[]
}
