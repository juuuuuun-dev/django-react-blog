import React from 'react';

import { CategoryDetail } from './.categories';

export type filterSelectColumnProps = {
  dataIndex: string;
  selected: number | null | undefined;
  listItem: CategoryDetail[] | undefined;
  handleChange: (number, any) => void;
  handleSearch: any;
  handleReset: (clearFilters: () => void) => void;
  searchedColumn: string;
  searchText: string;
  path: string;
}

export type dropdownProps = {
  setSelectedKeys: (value: string[]) => void | undefined;
  selectedKeys: Array<number>;
  confirm: () => void;
  clearFilters: () => void;
}