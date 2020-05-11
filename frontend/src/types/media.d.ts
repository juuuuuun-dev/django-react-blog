import { Pagination } from "./pagination";

export type MediaDetail = {
  id?: number;
  name: string;
  file: string;
  thumb?: string,
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
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  visible: boolean;
  setVisible: (bool: boolean) => void;
  target: any;
}