import React from 'react';
import { useParams } from 'react-router-dom';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import PostList from '../../components/main/posts/PostList';
import { useHistoryPushError } from '../../helper/useHistoryPushError';
import { categoryPagelist } from '../../service/main/posts';
import { PostList as PostListType } from '../../types/posts';

const Index: React.FC = () => {
  const [pushError] = useHistoryPushError();
  const [data, setData] = React.useState<PostListType>();
  const [query, setQuery] = useQueryParams({ page: NumberParam });

  const { slug } = useParams();

  const fetchData = React.useCallback(async () => {
    try {
      const res = await categoryPagelist(slug, { page: query.page });
      setData(res.data)
    } catch (e) {
      if (e.response && e.response.status) {
        pushError(e.response.status)
      }
    }

  }, [pushError, query]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (page: number, pageSize?: number | undefined): void => {
    setQuery({
      page: page,
    }, 'push')
  }

  return (
    <>
      <h3 className="list-title">Search:あ</h3>
      <PostList data={data} query={query} handlePageChange={handlePageChange} />
    </>
  )
}

export default Index