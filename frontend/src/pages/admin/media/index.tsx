import React from 'react';
import { AdminContext } from '../../../context/adminContext';
import { list } from '../../../service/admin/media';
import { Table, Input, Button, Row, Col } from 'antd';
import { useQuery, useHistoryPushWithQuery } from '../../../helper/query'
import searchColumn from "../../../components/admin/searchColumn"
import { Link, useHistory, useLocation } from 'react-router-dom';
import { IMediaList, IMediaListResult } from '../../../types/media'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Media: React.FC = () => {
  const query = useQuery();
  const { Search } = Input;
  const [page, setPage] = React.useState<string>(query.get("page") || "1")
  const history = useHistory();
  const location = useLocation();
  const { state, dispatch } = React.useContext(AdminContext);
  const [data, setData] = React.useState<IMediaList | undefined>();
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  // const [page, setPage] = React.useState<number>(1);
  React.useEffect(() => {
    if (state.hasToken) {
      fetchData();
    }
  }, [state.hasToken, page, searchQuery]);

  const fetchData = async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const res = await list({ page, search: searchQuery });
      setData(res.data);
    } catch {
      console.log("error")
    }
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
  };
  const searchRef = React.useRef<null | Input>(null);
  const [searchText, setSearchText] = React.useState<string>('');
  const [searchedColumn, setSearchedColumn] = React.useState<string>('');

  const handleFilterSearch = (selectedKeys: string, confirm: any, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex)
  };


  const handleQuerySearch = (search: string): void => {
    setSearchQuery(search);

  }

  const HandlePageChange = (page: number, pageSize?: number | undefined): void => {
    setPage(String(page));
    // const location = useLocation();
    useHistoryPushWithQuery({
      pathname: location.pathname,
      query: { page }
    })
    // pushHistory(page);
  }
  // const pushHistory = ({ pushPage, search }): void => {
  //   const queryPage = pushPage || page;
  //   const pushLocation = {
  //     pathname: location.pathname,
  //     search: `?page=${page}`
  //   }
  //   history.push(pushLocation);
  // }
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
      ...searchColumn({
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
          <Search placeholder="search" onSearch={(value) => handleQuerySearch(value)} enterButton />
        </Col>
      </Row>
      <Table
        className="table"
        columns={columns}
        dataSource={data?.results}
        pagination={{
          total: data?.count,
          pageSize: state.pageSize,
          defaultCurrent: parseInt(page || "1"),
          onChange: HandlePageChange,
        }}
      />
    </>
  );
};

export default Media;
