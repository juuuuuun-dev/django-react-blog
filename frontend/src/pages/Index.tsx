import React from 'react';

import PostList from '../components/main/posts/PostList';
import { useHistoryPushError } from '../helper/useHistoryPushError';
import { list } from '../service/main/posts';
import { PostDetail } from '../types/posts';

const Index = () => {
  const [posts, setPosts] = React.useState<PostDetail[]>([])
  const [pushError] = useHistoryPushError();
  const fetchData = React.useCallback(async () => {
    try {
      const res = await list();
      setPosts(res.data.posts)
    } catch (e) {
      if (e.response && e.response.status) {
        pushError(e.response.status)
      }
    }

  }, [pushError]);
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
