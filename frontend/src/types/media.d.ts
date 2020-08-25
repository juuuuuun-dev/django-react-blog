import { Pagination } from './pagination';

export type MediaDetail = {
  id?: number;
  name: string;
  file: string;
  thumb?: string,
  width: number;
  height: number;
  updated_at?: string;
  created_at?: string;
}

export type MediaList = Pagination & {
  results: MediaDetail[]
}


export type MediaFormProps = {
  data?: MediaDetail;
  onSubmit: (values: any) => Promise<void>;
  error?: {
    name?: Array<string>,
    file?: Array<string>,
  }
}


export type MediaModalProps = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
  handleAddMedia: any;
}