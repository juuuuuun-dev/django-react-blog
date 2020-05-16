import React from 'react';
import { PostDetail } from '../types/posts'
import { list } from '../service/main/posts'
import PostList from '../components/main/posts/PostList'

const Index = () => {
  const [posts, setPosts] = React.useState<PostDetail[]>([])

  const fetchData = React.useCallback(async () => {
    const res = await list();
    if (res.status === 200) {
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
