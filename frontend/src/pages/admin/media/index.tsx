import React from 'react';
import { AdminContext } from '../../../context/adminContext';
import { list } from '../../../service/admin/posts';
import { ITextValue, ITagList } from '../../../types/tags';
import { Table, Input, Button, Tag } from 'antd';
import searchColumn from "../../../components/admin/searchColumn"
import { Link, useRouteMatch } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';

interface IPostData {
  id: number;
  key: number;
  name: string;
  path: string;
  created_at: string;
  updated_at: string;
}
const Posts: React.FC = () => {
  const { state, dispatch } = React.useContext(AdminContext);
  const [data, setData] = React.useState<IPostData[] | undefined>([]);
  const [tags, setTags] = React.useState<ITextValue[]>([]);
  const match = useRouteMatch();
  console.log({ data })
  React.useEffect(() => {
    if (state.hasToken) {
      fetchData();
    }
  }, [state.hasToken]);

  const fetchData = async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    const res = await list();
    if (res.status === 200) {
      setData(res.data.data);
      const tags: ITextValue[] = [];
      res.data.tags.map((value: ITagList) => {
        tags.push({
          text: value.name,
          value: value.name,
        })
      });
      console.log(tags)
      setTags(tags);
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
      title: 'updated',
      name: 'updated_at',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: '10%',
      sorter: (a: IPostData, b: IPostData) => (a.updated_at > b.updated_at ? 1 : 0),
      render: (text: string) => (<span className="font-size-07">{text}</span>)
    },
    {
      title: 'created',
      name: 'created_at',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '10%',
      sorter: (a: IPostData, b: IPostData) => (a.created_at > b.created_at ? 1 : 0),
      render: (text: string) => (<span className="font-size-07">{text}</span>)
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
