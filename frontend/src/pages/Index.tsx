import React from 'react';

import PostList from '../components/main/posts/PostList';
import { list } from '../service/main/posts';
import { PostDetail } from '../types/posts';

const Index = () => {
  const [posts, setPosts] = React.useState<PostDetail[]>([])

  const fetchData = React.useCallback(async () => {
    const res = await list();
    if (res.status === 200) {
      console.log(res.data)
      setPosts(res.data.posts)
    }
  }, []);
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
