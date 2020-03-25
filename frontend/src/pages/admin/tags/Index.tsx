import React from 'react';
import { AdminContext } from '../../../context/adminContext';
import { list } from '../../../service/tags';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Input, Button } from 'antd';

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
  // @todo search
  const columns = [
    {
      title: 'name',
      name: 'name',
      dataIndex: 'name',
      key: 'name',
      width: '33%',
      // ...getColumnSearchProps('name'),
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
