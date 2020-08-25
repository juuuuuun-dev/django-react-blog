import React from 'react';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import PostList from '../components/main/posts/PostList';
import PostListTitle from '../components/main/posts/PostListTitle';
import { MainContext } from '../context/mainContext';
import { useHistoryPushError } from '../helper/useHistoryPushError';
import { list } from '../service/main/posts';
import { PostList as PostListType } from '../types/posts';

const Index = () => {
  const [pushError] = useHistoryPushError();
  const [data, setData] = React.useState<PostListType>();
  const [query, setQuery] = useQueryParams({ category: NumberParam, tag: NumberParam, search: StringParam, page: NumberParam });
  const context = React.useContext(MainContext);
  const dispatch = context[1];

  const fetchData = React.useCallback(async () => {
    try {
      const res = await list({ page: query.page, category: query.category, tag: query.tag, search: query.search });
      setData(res.data)
      const pageTitle = query.search ? `${query.search} - search` : '';
      dispatch({ type: 'SET_PAGE_TITLE', payload: { pageTitle: pageTitle } })
      dispatch({ type: 'SET_DESCRIPTION', payload: { description: pageTitle } })
    } catch (e) {
      if (e.response && e.response.status) {
        pushError(e.response.status)
      }
    }

  }, [pushError, dispatch, query]);
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (page: number, pageSize?: number | undefined): void => {
    setQuery({
      category: query.category || undefined,
      tag: query.tag || undefined,
      page: page,
      search: query.search || undefined,
    }, 'push')
  }

  const PageResults: React.FC = () => {
    if ((query.page && query.page > 1) || query.search) {
      if (data?.count) {
        return (
          <ul className="page-resutls">
            {query.page && query.page > 1 && <li>Page: {query.page}</li>}
            {query.search && data?.count && <li>({data?.count} results)</li>}
          </ul>
        )
      }
      return (
        <ul className="page-resutls">
          <li>(0 results)</li>
        </ul>
      )
    }
    return <></>
  }

  return (
    <>
      {query.search && <PostListTitle title={`${query.search}`} subTitle="search" />}
      <PageResults />
      <PostList data={data} query={query} handlePageChange={handlePageChange} />
    </>
  );
};

export default Index;
