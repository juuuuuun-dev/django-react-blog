import { Select } from 'antd';
import React from 'react';

import { FilterFilled } from '@ant-design/icons';

import { dropdownProps, filterSelectColumnProps } from '../../types/filterSelectColumn';

const { Option } = Select;

const FilterSelectColumn = ({ dataIndex, selected, listItem, handleChange }: filterSelectColumnProps) => ({
  filterDropdown: ({ confirm, clearFilters }: dropdownProps) => (
    <div style={{ padding: 8 }}>
      <Select
        aria-label={`filter-select-${dataIndex}`}
        allowClear
        placeholder={dataIndex}
        style={{ width: "180px" }}
        showSearch
        defaultValue={selected || undefined}
        onChange={(value: any) => {
          handleChange(value)
          confirm()
          if (!value) {
            clearFilters()
          }
        }}
        optionFilterProp="children"
      >
        {listItem?.map((value, index) => (
          <Option aria-label={`filter-option-${value.id}`} key={index} value={value.id}>{value.name}</Option>
        ))}
      </Select>
    </div>
  ),
  visible: false,
  filterIcon: (filtered: boolean) => <FilterFilled aria-label={`open-filter-select-${dataIndex}`} style={{ color: selected ? '#1890ff' : '#bbb' }} />,
  onFilter: (value: string | number | boolean, record: any) => {
    return record[dataIndex]
      .toString()
      .toLowerCase()
      .includes(value)
  },
  render: (text: string, record: any) =>
    (<>{text}</>),
})


export default FilterSelectColumn;