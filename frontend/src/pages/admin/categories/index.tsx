import { Input, Table } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import CreateAndSearchRow from '../../../components/admin/CreateAndSearchRow';
import searchWithinPageColumn from '../../../components/admin/SearchWithinPageColumn';
import toast from '../../../components/common/toast';
import { AdminContext } from '../../../context/adminContext';
import { sortDate } from '../../../helper/sort';
import { list } from '../../../service/admin/categories';
import { CategoryDetail, CategoryList } from '../../../types/categories';

const Categories: React.FC = () => {
  const [state, dispatch] = React.useContext(AdminContext);
  const [query, setQuery] = useQueryParams({ page: NumberParam, search: StringParam });
  const [data, setData] = React.useState<CategoryList>();
  const searchRef = React.useRef<null | Input>(null);
  const [searchText, setSearchText] = React.useState<string>('');
  const [searchedColumn, setSearchedColumn] = React.useState<string>('');

  const location = useLocation();

  const fetchData = React.useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const res = await list({ page: query.page, search: query.search });
      setData(res.data);
    } catch {
      toast({ type: 'ERROR' });
    }
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
  }, [dispatch, query.page, query.search]);

  React.useEffect(() => {
    if (state.hasToken) fetchData();
  }, [fetchData, state.hasToken, query.page, query.search]);

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
      title: 'slug',
      name: 'slug',
      dataIndex: 'slug',
      key: 'slug',
      width: '25%',
    },
    {
      title: 'updated_at',
      name: 'updated_at',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: '15%',
      sorter: (a: CategoryDetail, b: CategoryDetail) => sortDate(a.updated_at, b.updated_at),
      render: (text: string) => (<span className="font-size-07">{text}</span>)
    },
    {
      title: 'created_at',
      name: 'created_at',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '15%',
      sorter: (a: CategoryDetail, b: CategoryDetail) => sortDate(a.created_at, b.created_at),
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
        className="table"
        columns={columns}
        dataSource={data?.results}
        onRow={(record: any, rowIndex: any) => {
          return {
            onClick: event => {
              console.log({ event })
            }, // click row
          }
        }}
        pagination={{
          total: data?.count,
          pageSize: state.pageSize,
          defaultCurrent: query.page || 1,
          onChange: handlePageChange,
        }} />
    </>
  );
};

export default Categories;
