import React from "react";
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from "react-highlight-words";
import { Link } from 'react-router-dom';

interface props {
  dataIndex: string;
  searchRef: React.MutableRefObject<Input | null>;
  handleSearch: any;
  handleReset: (clearFilters: () => void) => void;
  searchedColumn: string;
  searchText: string;
  path: string;
}
interface SearchProp {
  setSelectedKeys: (value: string[]) => void | undefined;
  selectedKeys: Array<number>;
  confirm: string;
  clearFilters: () => void;
}
const searchWithinPageColumn = ({ dataIndex, searchRef, handleSearch, handleReset, searchedColumn, searchText, path }: props) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: SearchProp) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={searchRef}
        placeholder={`Search within page`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Button
        type="primary"
        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
        icon={<SearchOutlined />}
        size="small"
        style={{ width: 90, marginRight: 8 }}
      >
        Search
      </Button>
      <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
        Reset
      </Button>
    </div>
  ),
  filterIcon: (filtered: string) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  onFilter: (value: string | number | boolean, record: any) =>
    record[dataIndex]
      .toString()
      .toLowerCase()
      .includes(value),
  onFilterDropdownVisibleChange: (visible: boolean) => {
    if (visible) {
      setTimeout(() => {
        if (searchRef !== null && searchRef.current) {
          searchRef.current.select();
        }
      });
    }
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
});


export default searchWithinPageColumn;