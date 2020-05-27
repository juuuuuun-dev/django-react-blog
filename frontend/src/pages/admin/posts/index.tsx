import { Input, Table, Tag } from 'antd';
import { keyBy } from 'lodash';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import { CheckOutlined } from '@ant-design/icons';

import CreateAndSearchRow from '../../../components/admin/CreateAndSearchRow';
import searchWithinPageColumn from '../../../components/admin/SearchWithinPageColumn';
import toast from '../../../components/common/toast';
import { AdminContext } from '../../../context/adminContext';
import { sortBoolean, sortDate } from '../../../helper/sort';
import { list } from '../../../service/admin/posts';
import { PostDetail, PostList } from '../../../types/posts';
import { TagDetail, TagListItem } from '../../../types/tags';

const Posts: React.FC = () => {
  const [state, dispatch] = React.useContext(AdminContext);
  const [query, setQuery] = useQueryParams({ page: NumberParam, search: StringParam });
  const [searchText, setSearchText] = React.useState<string>('');
  const [searchedColumn, setSearchedColumn] = React.useState<string>('');
  const [data, setData] = React.useState<PostList | undefined>();
  const searchRef = React.useRef<null | Input>(null);
  const location = useLocation();
  const tagById: any = React.useMemo(() => {
    return keyBy(data?.tags, 'id')
  }, [data])

  const tags: TagListItem[] = React.useMemo(() => {
    const arr: TagListItem[] = [];
    data?.tags.forEach((value: TagDetail) => {
      arr.push({
        text: value.name,
        value: value.name,
      })
    });
    return arr;
  }, [data])

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
  console.log(tagById)
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
      width: '43%',
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
      width: '15%',
      // sorter: (a: PostDetail, b: PostDetail) => sortTextLength(a.category, b.category),
      render: (text: { id: number, name: string }) =>
        (<>{text}</>)
    },
    {
      title: 'tag',
      name: 'tag',
      dataIndex: 'tag',
      key: 'tag',
      width: '15%',
      filters: tags,
      onFilter: (value: string | number | boolean, record: PostDetail) => {
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
        (<>{tagById && text.map((value, index) => {
          if (tagById[value]) {
            return <Tag key={index}>{tagById[value].name}</Tag>
          }
          return null
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
      width: '6%',
      sorter: (a: PostDetail, b: PostDetail) => sortBoolean(a.is_show, b.is_show),
    },
    {
      title: 'updated',
      name: 'updated_at',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: '10%',
      sorter: (a: PostDetail, b: PostDetail) => sortDate(a.updated_at, b.updated_at),
      render: (text: string) => (<span className="font-size-07">{text}</span>)
    },
    {
      title: 'created',
      name: 'created_at',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '10%',
      sorter: (a: PostDetail, b: PostDetail) => sortDate(a.created_at, b.created_at),
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
