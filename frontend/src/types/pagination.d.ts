export type Pagination = {
  count: number;
  next: string | null;
  previous: string | null;
}

export type ListQuery = {
  page: number | null | undefined;
  search?: string | null | undefined;
  categories?: number[];
}