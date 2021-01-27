import '../../less/admin/postForm.less';
import '../../less/markdown.less';

import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import PostDetail from '../../components/main/posts/PostDetail';
import TemporaryPostDetail from '../../components/main/posts/TemporaryPostDetail';
import SnsShare from '../../components/main/SNS/Share';
import { MainContext } from '../../context/mainContext';
import { createLdJsonTypeBlogPosting } from '../../helper/ldJson';
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
        const ldJson = createLdJsonTypeBlogPosting({ init: state.init, post: res.data.post });
        dispatch({ type: 'SET_PAGE_TITLE', payload: { pageTitle: res.data.post.title } })
        dispatch({ type: 'SET_META', payload: { meta: meta } })
        dispatch({ type: 'SET_LD_JSON', payload: { ldJson } })
        setPost(res.data.post)
      }
    } catch (e) {
      if (e.response && e.response.status) {
        pushError(e.response.status)
      }
    }
  }, [id, pushError, dispatch, state.init, history.location.pathname])
  React.useEffect(() => {
    if (state.init) {
      fetchData();
    }
  }, [fetchData, state.init]);

  return (
    <>
      {!post && <TemporaryPostDetail />}
      {post && <PostDetail post={post} />}
      {post && <SnsShare title={post.title} url={state.init?.url + history.location.pathname} />}
    </>
  );
};

export default Detail;
