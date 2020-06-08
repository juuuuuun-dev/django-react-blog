import React from 'react';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import PostList from '../components/main/posts/PostList';
import { useHistoryPushError } from '../helper/useHistoryPushError';
import { list } from '../service/main/posts';
import { PostDetail } from '../types/posts';

const Index = () => {
  const [posts, setPosts] = React.useState<PostDetail[]>([])
  const [query, setQuery] = useQueryParams({ category: NumberParam, tag: NumberParam, search: StringParam, page: NumberParam });

  const [pushError] = useHistoryPushError();

  const fetchData = React.useCallback(async () => {
    try {
      const res = await list({ page: query.page, category: query.category, tag: query.tag, search: query.search });
      setPosts(res.data.posts)
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
      <PostList posts={posts} />
    </>
  );
};

export default Index;
