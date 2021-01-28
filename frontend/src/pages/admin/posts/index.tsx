import { Table, Tag } from 'antd';
import keyBy from 'lodash/keyBy';
import moment from 'moment';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import { CheckOutlined } from '@ant-design/icons';

// import searchWithinPageColumn from '../../../components/admin/SearchWithinPageColumn';
import CreateAndSearchRow from '../../../components/admin/CreateAndSearchRow';
import FilterSelectColumn from '../../../components/admin/FilterSelectColumn';
import toast from '../../../components/common/toast';
import { AdminContext } from '../../../context/adminContext';
import { sortBoolean, sortDate } from '../../../helper/sort';
import { list } from '../../../service/admin/posts';
import { PostDetail, PostList } from '../../../types/posts';

const Posts: React.FC = () => {
  const [state, dispatch] = React.useContext(AdminContext);
  const [query, setQuery] = useQueryParams({ category: NumberParam, tag: NumberParam, search: StringParam, page: NumberParam });
  const [data, setData] = React.useState<PostList | undefined>();
  const location = useLocation();
  const history = useHistory();
  // const [searchText, setSearchText] = React.useState<string>('');
  // const [searchedColumn, setSearchedColumn] = React.useState<string>('');
  // const searchRef = React.useRef<null | Input>(null);

  const categoryById: any = React.useMemo(() => {
    return keyBy(data?.categories, 'id')
  }, [data])


  const tagById: any = React.useMemo(() => {
    return keyBy(data?.tags, 'id')
  }, [data])

  const fetchData = React.useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const res = await list({ page: query.page, category: query.category, tag: query.tag, search: query.search });
      setData(res.data);
    } catch {
      toast({ type: 'ERROR' });
    }
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
  }, [dispatch, query.category, query.tag, query.page, query.search]);

  React.useEffect(() => {
    if (state.hasToken) fetchData();
  }, [fetchData, state.hasToken, query]);

  // const handleFilterSearch = (selectedKeys: string, confirm: any, dataIndex: string) => {
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex)
  // };

  const handleQuerySearch = (search: string): void => {
    setQuery({
      category: undefined,
      tag: undefined,
      search: search,
      page: 1,
    }, 'push');
  }

  const handleCategoryChange = (value: number | undefined): void => {
    setQuery({
      category: value,
      tag: undefined,
      search: undefined,
      page: 1,
    }, 'push');
  }

  const handleTagChange = (value: number | undefined): void => {
    setQuery({
      category: undefined,
      tag: value,
      search: undefined,
      page: 1,
    }, 'push');
  }

  const handlePageChange = (page: number, pageSize?: number | undefined): void => {
    setQuery({
      category: query.category || undefined,
      tag: query.tag || undefined,
      page: page,
      search: query.search || undefined,
    }, 'push')
  }
  // const handleReset = (clearFilters: () => void) => {
  //   clearFilters();
  //   setSearchText('');
  // };

  const columns = [
    {
      title: 'title',
      name: 'title',
      dataIndex: 'title',
      key: 'title',
      width: '43%',
      // ...searchWithinPageColumn({
      //   dataIndex: 'title',
      //   searchRef: searchRef,
      //   handleSearch: handleFilterSearch,
      //   handleReset: handleReset,
      //   searchedColumn: searchedColumn,
      //   searchText: searchText,
      //   path: location.pathname,
      // })
    },
    {
      title: 'category',
      name: 'category',
      dataIndex: 'category',
      key: 'category',
      width: '15%',
      ...FilterSelectColumn({
        dataIndex: 'category',
        selected: query.category,
        listItem: data?.categories,
        handleChange: handleCategoryChange,
      }),
      render: (text: number) => {
        if (categoryById && categoryById[text]) {
          return <>{categoryById[text].name}</>
        }
        return <>{text}</>
      }
    },
    {
      title: 'tag',
      name: 'tag',
      dataIndex: 'tag',
      key: 'tag',
      width: '15%',
      ...FilterSelectColumn({
        dataIndex: 'tag',
        selected: query.tag,
        listItem: data?.tags,
        handleChange: handleTagChange,
      }),
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
      render: (text: string) => (<span className="font-size-07">{moment(text).format(state.dateTimeFormat)}</span>)
    },
    {
      title: 'created',
      name: 'created_at',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '10%',
      sorter: (a: PostDetail, b: PostDetail) => sortDate(a.created_at, b.created_at),
      render: (text: string) => (<span className="font-size-07">{moment(text).format(state.dateTimeFormat)}</span>)
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
        className="admin-table"
        columns={columns}
        dataSource={data?.results}
        onRow={(record: any) => {
          return {
            onClick: () => {
              history.push(`${location.pathname}/${record.slug}/edit`);
            },
          }
        }}
        pagination={{
          total: data?.count,
          pageSize: state.pageSize || 1,
          defaultCurrent: query.page || 1,
          current: query.page || 1,
          onChange: handlePageChange,
        }} />
    </>
  );
};

export default Posts;
