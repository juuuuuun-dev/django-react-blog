import '../../less/admin/postForm.less';

import React from 'react';
import { useParams } from 'react-router-dom';

import PostDetail from '../../components/main/posts/PostDetail';
import { useHistoryPushError } from '../../helper/useHistoryPushError';
import { retrieve } from '../../service/main/posts';
import { PostDetail as TypePostDetail } from '../../types/posts';

const Detail: React.FC = () => {
  const [post, setPost] = React.useState<TypePostDetail>()
  const { id } = useParams();
  const [pushError] = useHistoryPushError();
  const fetchData = React.useCallback(async () => {
    try {
      const res = await retrieve(id);
      if (res.status === 200) {
        setPost(res.data.post)
      }
    } catch (e) {
      if (e.response && e.response.status) {
        pushError(e.response.status)
      }
    }
  }, [id, pushError])
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
