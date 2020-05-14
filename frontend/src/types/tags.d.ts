import { Pagination } from "./pagination"

export type TagDetail = {
  id: number;
  name: string;
  key?: number;
  updated_at: string;
  created_at: string;
}

export type TagList = Pagination & {
  results: TagDetail[]
}

export type TagListItem = {
  text: string;
  value: string;
}

export type TagFormProps = {
  data?: TagDetail;
  onSubmit: (values: any) => Promise<void>;
  error?: {
    name?: Array<string>
  }
}

export type RequestData = {
  name: string;
}