import React from 'react';
import { useParams } from 'react-router-dom';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import PostList from '../../components/main/posts/PostList';
import { useHistoryPushError } from '../../helper/useHistoryPushError';
import { list } from '../../service/main/posts';
import { PostList as PostListType } from '../../types/posts';

const Index: React.FC = () => {
  const [pushError] = useHistoryPushError();
  const [data, setData] = React.useState<PostListType>();
  const [query, setQuery] = useQueryParams({ page: NumberParam });

  const { id } = useParams();

  const fetchData = React.useCallback(async () => {
    try {
      const res = await list({ page: query.page });
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
  return (
    <>
    </>
  )
}

export default Index