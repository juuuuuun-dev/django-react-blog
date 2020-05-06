import React from 'react';
import { AdminContext } from '../../../context/adminContext';
import { list } from '../../../service/admin/posts';
import { ITextValue, ITagListResult } from '../../../types/tags';
import { Table, Input, Tag } from 'antd';
import { IPostList, IPostListResult } from '../../../types/posts';
import CreateAndSearchRow from '../../../components/admin/CreateAndSearchRow';
import searchWithinPageColumn from "../../../components/admin/SearchWithinPageColumn"
import { useLocation } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';
import { useQueryParams, StringParam, NumberParam } from 'use-query-params';
import toast from '../../../components/common/toast';
import { sortDate, sortBoolean, sortTextLength } from '../../../helper/sort';

const Posts: React.FC = () => {
  const { state, dispatch } = React.useContext(AdminContext);
  const [query, setQuery] = useQueryParams({ page: NumberParam, search: StringParam });
  const [searchText, setSearchText] = React.useState<string>('');
  const [searchedColumn, setSearchedColumn] = React.useState<string>('');
  const [data, setData] = React.useState<IPostList | undefined>();
  const [tags, setTags] = React.useState<ITextValue[]>([]);
  const searchRef = React.useRef<null | Input>(null);
  const location = useLocation();

  const fetchData = React.useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const res = await list({ page: query.page, search: query.search });
      setData(res.data);
      const tags: ITextValue[] = [];
      res.data.tags.forEach((value: ITagListResult) => {
        tags.push({
          text: value.name,
          value: value.name,
        })
      });
      setTags(tags);
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
      title: 'title',
      name: 'title',
      dataIndex: 'title',
      key: 'title',
      width: '33%',
      ...searchWithinPageColumn({
        dataIndex: 'title',
        searchRef: searchRef,
        handleSearch: handleFilterSearch,
        handleReset: handleReset,
        searchedColumn: searchedColumn,
        searchText: searchText,
        path: location.pathname,
      })
    },
    {
      title: 'category',
      name: 'category',
      dataIndex: 'category',
      key: 'category',
      width: '20%',
      sorter: (a: IPostListResult, b: IPostListResult) => sortTextLength(a.category.name, b.category.name),
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
      onFilter: (value: string | number | boolean, record: IPostListResult) => {
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
        ) : null,
      width: '10%',
      sorter: (a: IPostListResult, b: IPostListResult) => sortBoolean(a.is_show, b.is_show),
    },
    {
      title: 'updated',
      name: 'updated_at',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: '10%',
      sorter: (a: IPostListResult, b: IPostListResult) => sortDate(a.updated_at, b.updated_at),
      render: (text: string) => (<span className="font-size-07">{text}</span>)
    },
    {
      title: 'created',
      name: 'created_at',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '10%',
      sorter: (a: IPostListResult, b: IPostListResult) => sortDate(a.created_at, b.created_at),
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
        pagination={{
          total: data?.count,
          pageSize: state.pageSize,
          defaultCurrent: query.page || 1,
          onChange: handlePageChange,
        }} />
    </>
  );
};

export default Posts;
