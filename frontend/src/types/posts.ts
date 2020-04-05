export interface ITagData {
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