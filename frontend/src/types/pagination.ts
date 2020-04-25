export interface IPagination {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface IListQuery {
  page: number | null | undefined;
  search?: string | null | undefined;
}