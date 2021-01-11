import { Pagination } from './pagination';

export type CategoryDetail = {
  id: number;
  key?: number;
  name: string;
  slug: string;
  updated_at?: string;
  created_at?: string;
}

export type CategoryList = Pagination & {
  results: CategoryDetail[]
}

export type CategoryFormProps = {
  data?: CategoryDetail;
  onSubmit: (values: any) => Promise<void>;
  isStaff: boolean;
  error?: {
    name?: Array<string>
    slug?: Array<string>
  }
}
export type RequestData = {
  name: string;
  slug: string;
}
