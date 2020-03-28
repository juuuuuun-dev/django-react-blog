import React from "react";
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from "react-highlight-words";

interface props {
  dataIndex: string;
  searchRef: React.MutableRefObject<Input | null>;
  handleSearch: any;
  handleReset: any;
  searchedColumn: any;
  searchText: string;
}
interface searchProp {
  setSelectedKeys: ([]) => void | undefined;
  selectedKeys: Array<number>;
  confirm: string;
  clearFilters: string;

}
const searchColumn = ({ dataIndex, searchRef, handleSearch, handleReset, searchedColumn, searchText }: props) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: searchProp) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={searchRef}
        placeholder={`Search ${dataIndex}`}
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
  filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  onFilter: (value: any, record: any) =>
    record[dataIndex]
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase()),
  onFilterDropdownVisibleChange: (visible: any) => {
    if (visible) {
      setTimeout(() => {
        if (searchRef !== null && searchRef.current) {
          searchRef.current.select();
        }
      });
    }
  },
  render: (text: any) =>
    searchedColumn === dataIndex ? (
      // text
      <Highlighter
        highlightStyle={{ backgroundColor: '#eeeeee', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ) : (
        text
      ),
});


export default searchColumn;