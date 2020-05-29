import { Button, Input, Select } from 'antd';
import React from 'react';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';

import { FilterFilled, SearchOutlined } from '@ant-design/icons';

import { dropdownProps, filterSelectColumnProps } from '../../types/filterSelectColumn';

const { Option } = Select;
const FilterSelectColumn = ({ dataIndex, selected, listItem, handleChange, handleSearch, handleReset, searchedColumn, searchText, path }: filterSelectColumnProps) => {
  const [selectedData, setSelectedData] = React.useState<number>();

  return ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: dropdownProps) => (
      <div style={{ padding: 8 }}>
        <Select
          allowClear
          placeholder="Category"
          style={{ width: "180px" }}
          showSearch
          defaultValue={selected || undefined}
          onChange={(value: any) => {
            setSelectedKeys(value ? [value] : []);
            handleChange(value, confirm);
            setSelectedData(value)
            if (!value) {
              clearFilters()
            }
          }}
          optionFilterProp="children"
        >
          {listItem?.map((value, index) => (
            <Option key={index} value={value.id}>{value.name}</Option>
          ))}
        </Select>
        {/* <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          aria-label="submit-filter-search"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button aria-label="reset-filter-search" onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button> */}
      </div>
    ),
    filterIcon: (filtered: boolean) => <FilterFilled aria-label="open-filter-serach" style={{ color: selected ? '#1890ff' : '#bbb' }} />,
    onFilter: (value: string | number | boolean, record: any) => {
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value)
    },
    render: (text: string, record: any) =>
      searchedColumn === dataIndex ? (
        // text
        <Link to={`${path}/${record.id}/edit`}>
          <Highlighter
            highlightStyle={{ backgroundColor: '#eeeeee', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        </Link>
      ) : (
          <Link to={`${path}/${record.id}/edit`}>{text}</Link>
        ),
  })
};


export default FilterSelectColumn;