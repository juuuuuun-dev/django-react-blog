export interface IPagination {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface IListQuery {
  page: string | null;
  search?: string;
}