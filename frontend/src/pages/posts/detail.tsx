import '../../less/admin/postForm.less';
import '../../less/markdown.less';

import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { TagOutlined } from '@ant-design/icons';

import PostDetail from '../../components/main/posts/PostDetail';
import PostList from '../../components/main/posts/PostList';
import TemporaryPostDetail from '../../components/main/posts/TemporaryPostDetail';
import { MainContext } from '../../context/mainContext';
import { createLdJsonTypeBlogPosting } from '../../helper/ldJson';
import { createMeta } from '../../helper/meta';
import { useHistoryPushError } from '../../helper/useHistoryPushError';
import { retrieve } from '../../service/main/posts';
import { MediaSize, PostDetail as TypePostDetail } from '../../types/posts';

const Detail: React.FC = () => {
  const [{ temporaryPostList }] = React.useContext(MainContext);
  const [post, setPost] = React.useState<TypePostDetail>()
  const [mediaSize, setMediaSize] = React.useState<MediaSize>()
  const [list, setList] = React.useState(temporaryPostList)

  const { slug } = useParams();
  const [state, dispatch] = React.useContext(MainContext);
  const [pushError] = useHistoryPushError();
  const history = useHistory();
  const fetchData = React.useCallback(async () => {
    try {
      const res = await retrieve(slug);
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
        setList(res.data.related_posts)
        setMediaSize(res.data.media_size)
      }
    } catch (e) {
      if (e.response && e.response.status) {
        pushError(e.response.status)
      }
    }
  }, [slug, pushError, dispatch, state.init, history.location.pathname])
  React.useEffect(() => {
    if (state.init) {
      fetchData();
    }
  }, [fetchData, state.init]);

  return (
    <>
      {!post && <TemporaryPostDetail />}
      {post && <PostDetail post={post} />}
      {post &&
        <div className="related-posts">
          <h3 className="related-posts-title"><TagOutlined /> 関連記事</h3> 
          <PostList data={list} loading={false} media_size={mediaSize} showDate={false} descriptionRows={1} />
        </div>
      }
    </>
  );
};

export default Detail;
