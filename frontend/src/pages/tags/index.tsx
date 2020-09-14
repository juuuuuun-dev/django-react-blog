import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { NumberParam, useQueryParams } from 'use-query-params';

import PostList from '../../components/main/posts/PostList';
import PostListPageCountResults from '../../components/main/posts/PostListPageCountResults';
import PostListTitle from '../../components/main/posts/PostListTitle';
import { MainContext } from '../../context/mainContext';
import { createLdJsonTypeWebSite } from '../../helper/ldJson';
import { createMeta } from '../../helper/meta';
import { useHistoryPushError } from '../../helper/useHistoryPushError';
import { tagPagelist } from '../../service/main/posts';
import { PostList as PostListType } from '../../types/posts';

const Index: React.FC = () => {
  const [pushError] = useHistoryPushError();
  const [data, setData] = React.useState<PostListType>();
  const [query, setQuery] = useQueryParams({ page: NumberParam });
  const [state, dispatch] = React.useContext(MainContext);
  const { slug } = useParams();
  const history = useHistory();

  const fetchData = React.useCallback(async () => {
    try {
      const res = await tagPagelist(slug, { page: query.page });
      const pageNumberTitle = query.page ? `page ${query.page}` : ''
      const meta = createMeta({
        title: state.init?.siteSettings.title,
        url: state.init?.url + history.location.pathname,
        description: state.init?.siteSettings.description,
        image: state.init?.siteSettings.mainImage,
      })
      const ldJson = createLdJsonTypeWebSite({ init: state.init });
      dispatch({ type: 'SET_META', payload: { meta: meta } })
      dispatch({ type: 'SET_LD_JSON', payload: { ldJson: [ldJson] } })
      dispatch({ type: 'SET_PAGE_TITLE', payload: { pageTitle: `${res.data.tag_name} - tag` + pageNumberTitle } })
      setData(res.data)
    } catch (e) {
      if (e.response && e.response.status) {
        pushError(e.response.status)
      }
    }

  }, [pushError, dispatch, query, slug, state.init, history.location.pathname]);

  React.useEffect(() => {
    if (state.init) {
      fetchData();
    }
  }, [fetchData, state.init]);

  const handlePageChange = (page: number, pageSize?: number | undefined): void => {
    setQuery({
      page: page,
    }, 'push')
  }

  return (
    <>
      <PostListTitle title={`${data?.tag_name}`} subTitle="tag" />
      <PostListPageCountResults count={data?.count} query={query} />
      <PostList data={data} query={query} handlePageChange={handlePageChange} />
    </>
  )
}

export default Index