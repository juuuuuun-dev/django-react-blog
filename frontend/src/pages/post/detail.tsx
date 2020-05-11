import React from 'react';
import { PostDetail as TypePostDetail } from '../../types/posts'
import { useParams } from 'react-router-dom';
import { retrieve } from '../../service/main/posts'
import PostDetail from '../../components/main/PostDetail'

const Detail: React.FC = () => {
  const [post, setPost] = React.useState<TypePostDetail>()
  const { id } = useParams();

  const fetchData = React.useCallback(async () => {
    const res = await retrieve(id);
    if (res.status === 200) {
      setPost(res.data.post)
    }
  }, [id])
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {post && <PostDetail post={post} />}
    </>
  );
};

export default Detail;
