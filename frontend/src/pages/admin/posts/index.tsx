import React from 'react';
import { AdminContext } from '../../../context/adminContext';
import { list } from '../../../service/posts';
// import { IData } from '../../../types/posts';
import { Table, Input, Button } from 'antd';
import searchColumn from "../../../components/admin/searchColumn"
import { Link, useRouteMatch } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';

interface IData {
  id: number;
  key: number;
  title: string;
  content: string;
  is_show: boolean;
  category: number;
  tag: Array<number>;
  updated_at: string;
  created_at: string;
}

const Posts: React.FC = () => {
  const { state, dispatch } = React.useContext(AdminContext);
  const [data, setData] = React.useState<IData[]>([]);
  const match = useRouteMatch();
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
  const searchRef = React.useRef<null | Input>(null);
  const [searchText, setSearchText] = React.useState<string>('');
  const [searchedColumn, setSearchedColumn] = React.useState<string>('');

  const handleSearch = (selectedKeys: string, confirm: any, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex)
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'title',
      name: 'title',
      dataIndex: 'title',
      key: 'title',
      width: '33%',
      ...searchColumn({
        dataIndex: 'title',
        searchRef: searchRef,
        handleSearch: handleSearch,
        handleReset: handleReset,
        searchedColumn: searchedColumn,
        searchText: searchText,
        path: match.path,
      })
    },
    {
      title: 'show',
      name: 'is_show',
      dataIndex: 'is_show',
      key: 'is_show',
      render: (text: boolean) =>
        text === true ? (
          <CheckOutlined />
        ) : (
            <></>
          ),
      width: '33%',
      sorter: (a: IData, b: IData) => (a.is_show > b.is_show ? 1 : 0),
    },
    {
      title: 'cateogry',
      name: 'cateogry',
      dataIndex: 'cateogry',
      key: 'cateogry',
      width: '33%',
      sorter: (a: IData, b: IData) => (a.is_show > b.is_show ? 1 : 0),
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
  return (
    <>
      <Link to={`${match.path}/create`}><Button type="primary" style={{ marginBottom: "10px" }}>CREATE</Button></Link>
      <Table className="table" columns={columns} dataSource={data} pagination={{ pageSize: 20 }} />
    </>
  );
};

export default Posts;
