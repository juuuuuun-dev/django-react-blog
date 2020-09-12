import '../../less/admin/postForm.less';

import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import PostDetail from '../../components/main/posts/PostDetail';
import { MainContext } from '../../context/mainContext';
import { createMeta } from '../../helper/meta';
import { useHistoryPushError } from '../../helper/useHistoryPushError';
import { retrieve } from '../../service/main/posts';
import { PostDetail as TypePostDetail } from '../../types/posts';

const Detail: React.FC = () => {
  const [post, setPost] = React.useState<TypePostDetail>()
  const { id } = useParams();
  const [state, dispatch] = React.useContext(MainContext);
  const [pushError] = useHistoryPushError();
  const history = useHistory();
  const fetchData = React.useCallback(async () => {
    try {
      const res = await retrieve(id);
      if (res.status === 200) {
        const meta = createMeta({
          title: res.data.post.title,
          url: state.init?.url + history.location.pathname,
          description: res.data.post.plain_content,
        })
        setPost(res.data.post)
        dispatch({ type: 'SET_PAGE_TITLE', payload: { pageTitle: res.data.post.title } })
        dispatch({ type: 'SET_DESCRIPTION', payload: { description: res.data.post.plain_content } })
        dispatch({ type: 'SET_META', payload: { meta: meta } })
      }
    } catch (e) {
      if (e.response && e.response.status) {
        pushError(e.response.status)
      }
    }
  }, [id, pushError, dispatch])
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
