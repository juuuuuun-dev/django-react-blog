import React from 'react';

import { CategoryDetail } from './.categories';

export type filterSelectColumnProps = {
  dataIndex: string;
  selected: number | null | undefined;
  listItem: CategoryDetail[] | undefined;
  handleChange: (number) => void;
}

export type dropdownProps = {
  confirm: () => void;
  clearFilters: () => void;
}