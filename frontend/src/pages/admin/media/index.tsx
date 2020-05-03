import React from 'react';
import { AdminContext } from '../../../context/adminContext';
import { list } from '../../../service/admin/media';
import { Table, Input } from 'antd';
import searchWithinPageColumn from "../../../components/admin/SearchWithinPageColumn"
import { useLocation } from 'react-router-dom';
import { IMediaList, IMediaListResult } from '../../../types/media'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useQueryParams, StringParam, NumberParam } from 'use-query-params';
import CreateAndSearchRow from '../../../components/admin/CreatAndSearchRow';
import toast from '../../../components/common/toast';
import { sortDate } from '../../../helper/sort';

const Media: React.FC = () => {
  const { state, dispatch } = React.useContext(AdminContext);
  const [query, setQuery] = useQueryParams({ page: NumberParam, search: StringParam });
  const [data, setData] = React.useState<IMediaList | undefined>();
  const [searchText, setSearchText] = React.useState<string>('');
  const [searchedColumn, setSearchedColumn] = React.useState<string>('');
  const searchRef = React.useRef<null | Input>(null);

  const location = useLocation();
  React.useEffect(() => {
    if (state.hasToken) {
      fetchData();
    }
  }, [state.hasToken, query.page, query.search]);
  const fetchData = async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const res = await list({ page: query.page, search: query.search });
      setData(res.data);
    } catch (e) {
      toast({ type: "ERROR" })
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
      render: (_text: string, record: IMediaListResult) => (<LazyLoadImage onClick={() => handlePreview(record.file)} alt="thumb" data-testid={`list-thumb-${record.id}`} style={{ cursor: "pointer" }} width={40} src={record.thumb} />)
    },
    {
      title: 'updated',
      detaTestId: 'sort-updated',
      name: 'updated_at',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: '10%',
      sorter: (a: IMediaListResult, b: IMediaListResult) => sortDate(a.updated_at, b.updated_at),
      render: (text: string) => (<span className="font-size-07">{text}</span>)
    },
    {
      title: 'created',
      name: 'created_at',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '10%',
      sorter: (a: IMediaListResult, b: IMediaListResult) => sortDate(a.created_at, b.created_at),
      render: (text: string) => (<span className="font-size-07">{text}</span>)
    },
  ];
  return (
    <>
      <CreateAndSearchRow
        pathname={location.pathname}
        search={query.search}
        handleQuerySearch={handleQuerySearch}
      />
      <Table
        data-testid="list-table"
        className="list-table"
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
