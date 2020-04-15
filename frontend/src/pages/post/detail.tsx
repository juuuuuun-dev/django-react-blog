import React from 'react';
import { IPostData } from '../../types/posts'
import { useParams } from 'react-router-dom';
import { retrieve } from '../../service/main/posts'
import PostDetail from '../../components/main/PostDetail'

const Detail: React.FC = () => {
  const [post, setPost] = React.useState<IPostData>()
  const { id } = useParams();

  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await retrieve(id);
    if (res.status === 200) {
      setPost(res.data.post)
    }
  }
  return (
    <>
      {post && <PostDetail post={post} />}
    </>
  );
};

export default Detail;
