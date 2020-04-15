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
      title: 'category',
      name: 'category',
      dataIndex: 'category',
      key: 'category',
      width: '20%',
      sorter: (a: IPostData, b: IPostData) => (a.is_show > b.is_show ? 1 : 0),
      render: (text: { id: number, name: string }) =>
        (<>{text.name}</>)
    },
    {
      title: 'tag',
      name: 'tag',
      dataIndex: 'tag',
      key: 'tag',
      width: '20%',
      filters: tags,
      onFilter: (value: string, record: IPostData) => {
        if (record.tag.length) {
          let includeFlag: boolean = false;
          record.tag.forEach((obj: any) => {
            if (obj.name.includes(value)) {
              includeFlag = true;
            }
          })
          return includeFlag;
        } else {
          return false;
        }
      },
      sorter: (a: IPostData, b: IPostData) => (a.is_show > b.is_show ? 1 : 0),
      render: (text: Array<any>) =>
        (<>{text.map((value, index) => {
          return <Tag key={index}>{value.name}</Tag>
        })}</>
        )
    },
    {
      title: 'show',
      name: 'is_show',
      dataIndex: 'is_show',
      key: 'is_show',
      render: (text: boolean) =>
        text === true ? (
          <CheckOutlined style={{ color: '#243a82' }} />
        ) : (
            <></>
          ),
      width: '10%',
      sorter: (a: IPostData, b: IPostData) => (a.is_show > b.is_show ? 1 : 0),
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
