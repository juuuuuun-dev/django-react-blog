import { Pagination } from "./pagination"

export type CategoryDetail = {
  id: number;
  key?: number;
  name: string;
  updated_at: string;
  created_at: string;
}

export type CategoryList = Pagination & {
  results: CategoryDetail[]
}

export type CategorySimpleList = {
  id: number;
  name: string;
}

export type CategoryFormProps = {
  data?: CategoryDetail;
  onSubmit: (values: any) => Promise<void>;
  error?: {
    name?: Array<string>
  }
}
export type RequestData = {
  name: string;
}