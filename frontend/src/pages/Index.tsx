import React from 'react';
import PostListItem from '../components/main/PostListItem'
import { IPostListData } from '../types/posts'
import { list } from '../service/main/posts'

const Index = () => {
  const [posts, setPosts] = React.useState<IPostListData[]>()
  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await list();
    if (res.status === 200) {
      console.log({ res })
      setPosts(res.data.posts)
    }
  }
  return (
    <>
      {posts?.map((value, index) => {
        return <PostListItem post={value} key={index} />
      })}
    </>
  );
};

export default Index;
