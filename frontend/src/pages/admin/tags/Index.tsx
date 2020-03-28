import React from 'react';
import { AdminContext } from '../../../context/adminContext';
import { list } from '../../../service/tags';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Input, Button } from 'antd';
import Highlighter from "react-highlight-words";
import searchColumn from "../../../components/admin/searchColumn"

interface IData {
  id: number;
  key: number;
  name: string;
  updated_at: string;
  created_at: string;
}

const Tags: React.FC = () => {
  const { state, dispatch } = React.useContext(AdminContext);
  const [data, setData] = React.useState<IData[]>([]);
  React.useEffect(() => {
    if (state.hasToken) {
      fetchData();
    }
  }, [state.hasToken]);

  const fetchData = async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    const res = await list();
    if (res.status === 200) {
      setData(res.data);
    }
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
  };

  interface searchProp {
    setSelectedKeys: ([]) => void | undefined;
    selectedKeys: Array<number>;
    confirm: string;
    clearFilters: string;
  }
  const searchRef = React.useRef<null | Input>(null);
  const getColumnSearchProps = (dataIndex: string) => ({
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




  const [searchText, setSearchText] = React.useState('');
  const [searchedColumn, setSearchedColumn] = React.useState('');

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex)
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText('');
  };
  const columns = [
    {
      title: 'name',
      name: 'name',
      dataIndex: 'name',
      key: 'name',
      width: '33%',
      // ...getColumnSearchProps('name'),
      ...searchColumn({ dataIndex: 'name', searchRef: searchRef, handleSearch: handleSearch, handleReset: handleReset, searchedColumn: searchedColumn, searchText: searchText })
    },
    {
      title: 'updated_at',
      name: 'updated_at',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: '33%',
      sorter: (a: IData, b: IData) => (a.updated_at > b.updated_at ? 1 : 0),
    },
    {
      title: 'created_at',
      name: 'created_at',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '33%',
      sorter: (a: IData, b: IData) => (a.created_at > b.created_at ? 1 : 0),
    },
  ];
  return <Table columns={columns} dataSource={data} pagination={{ pageSize: 2 }} />;
};

export default Tags;
