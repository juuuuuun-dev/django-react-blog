import React from 'react';
import { AdminContext } from '../../../context/adminContext';
import { list } from '../../../service/admin/media';
import { Table, Input, Button } from 'antd';
import searchColumn from "../../../components/admin/searchColumn"
import { Link, useRouteMatch } from 'react-router-dom';
import { IMediaList } from '../../../types/media'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Media: React.FC = () => {
  const { state, dispatch } = React.useContext(AdminContext);
  const [data, setData] = React.useState<IMediaList[] | undefined>([]);
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
      title: 'name',
      name: 'name',
      dataIndex: 'name',
      key: 'name',
      width: '33%',
      ...searchColumn({
        dataIndex: 'name',
        searchRef: searchRef,
        handleSearch: handleSearch,
        handleReset: handleReset,
        searchedColumn: searchedColumn,
        searchText: searchText,
        path: match.path,
      })
    },
    {
      title: 'file',
      name: 'file',
      dataIndex: 'file',
      key: 'file',
      width: '10%',
      sorter: (a: IMediaList, b: IMediaList) => (a.created_at > b.created_at ? 1 : 0),
      render: (text: string, record: IMediaList) => (<LazyLoadImage alt="thumb" width={40} src={record.thumb} />)
    },
    {
      title: 'updated',
      name: 'updated_at',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: '10%',
      sorter: (a: IMediaList, b: IMediaList) => (a.updated_at > b.updated_at ? 1 : 0),
      render: (text: string) => (<span className="font-size-07">{text}</span>)
    },
    {
      title: 'created',
      name: 'created_at',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '10%',
      sorter: (a: IMediaList, b: IMediaList) => (a.created_at > b.created_at ? 1 : 0),
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

export default Media;
