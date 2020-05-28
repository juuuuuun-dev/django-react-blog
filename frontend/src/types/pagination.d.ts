export type Pagination = {
  count: number;
  next: string | null;
  previous: string | null;
}

export type ListQuery = {
  page: number | null | undefined;
  search?: string | null | undefined;
  category?: number | null | undefined;
  tag?: number | null | undefined;
}