import React from 'react';
import { AdminContext } from '../../../context/adminContext';
import { list } from '../../../service/admin/media';
import { Table, Input, Button, Row, Col } from 'antd';
import searchWithinPageColumn from "../../../components/admin/SearchWithinPageColumn"
import { Link, useLocation } from 'react-router-dom';
import { IMediaList, IMediaListResult } from '../../../types/media'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useQueryParams, StringParam, NumberParam } from 'use-query-params';

const Media: React.FC = () => {
  const { state, dispatch } = React.useContext(AdminContext);
  const [query, setQuery] = useQueryParams({ page: NumberParam, search: StringParam });
  const [data, setData] = React.useState<IMediaList | undefined>();
  const [searchText, setSearchText] = React.useState<string>('');
  const [searchedColumn, setSearchedColumn] = React.useState<string>('');
  const searchRef = React.useRef<null | Input>(null);

  const { Search } = Input;
  const location = useLocation();
  React.useEffect(() => {
    console.log("effect")
    if (state.hasToken) {
      fetchData();
    }
  }, [state.hasToken, query.page, query.search]);

  const fetchData = async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const res = await list({ page: query.page, search: query.search });
      setData(res.data);
    } catch {
      console.log("error")
    }
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
  };

  const handleFilterSearch = (selectedKeys: string, confirm: any, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex)
  };

  const handleQuerySearch = (search: string): void => {
    setQuery({
      page: 1,
      search: search
    }, 'push');
  }

  const handlePageChange = (page: number, pageSize?: number | undefined): void => {
    setQuery({
      page: page,
      search: query.search
    }, 'push')
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const handlePreview = (imageUrl: string) => {
    window.open(imageUrl, "imgwindow")
  }

  const columns = [
    {
      title: 'name',
      name: 'name',
      dataIndex: 'name',
      key: 'name',
      width: '33%',
      ...searchWithinPageColumn({
        dataIndex: 'name',
        searchRef: searchRef,
        handleSearch: handleFilterSearch,
        handleReset: handleReset,
        searchedColumn: searchedColumn,
        searchText: searchText,
        path: location.pathname,
      })
    },
    {
      title: 'file',
      name: 'file',
      dataIndex: 'file',
      key: 'file',
      width: '10%',
      render: (text: string, record: IMediaListResult) => (<LazyLoadImage onClick={() => handlePreview(record.file)} alt="thumb" style={{ cursor: "pointer" }} width={40} src={record.thumb} />)
    },
    {
      title: 'updated',
      name: 'updated_at',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: '10%',
      sorter: (a: IMediaListResult, b: IMediaListResult) => (a.updated_at > b.updated_at ? 1 : 0),
      render: (text: string) => (<span className="font-size-07">{text}</span>)
    },
    {
      title: 'created',
      name: 'created_at',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '10%',
      sorter: (a: IMediaListResult, b: IMediaListResult) => (a.created_at > b.created_at ? 1 : 0),
      render: (text: string) => (<span className="font-size-07">{text}</span>)
    },
  ];
  return (
    <>
      <Row className="create-search-row">
        <Col flex="1 1 120px">
          <Link to={`${location.pathname}/create`}><Button type="primary" style={{ marginBottom: "10px" }}>CREATE</Button></Link>
        </Col>
        <Col flex="0 1 300px">
          <Search placeholder="search" defaultValue={`${query.search}`} onSearch={(value) => handleQuerySearch(value)} enterButton />
        </Col>
      </Row>
      <Table
        className="table"
        columns={columns}
        dataSource={data?.results}
        pagination={{
          total: data?.count,
          pageSize: state.pageSize,
          defaultCurrent: query.page || 1,
          onChange: handlePageChange,
        }}
      />
    </>
  );
};

export default Media;
