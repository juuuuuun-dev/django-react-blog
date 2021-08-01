import React from 'react';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import PostListPageCountResults from '../components/main/posts/PostListPageCountResults';
import PostListTemplate from '../components/main/posts/PostListTemplate';
import PostListTitle from '../components/main/posts/PostListTitle';
import { MainContext } from '../context/mainContext';
import { createLdJsonTypeWebSite } from '../helper/ldJson';
import { createMeta } from '../helper/meta';
import { useHistoryPushError } from '../helper/useHistoryPushError';
import { list } from '../service/main/posts';
import { PostList as PostListType } from '../types/posts';

const Index = () => {
  const [pushError] = useHistoryPushError();
  const [data, setData] = React.useState<PostListType>();
  const [query, setQuery] = useQueryParams({ category: NumberParam, tag: NumberParam, search: StringParam, page: NumberParam });
  const [state, dispatch] = React.useContext(MainContext);

  const fetchData = React.useCallback(async () => {
    try {
      const res = await list({ page: query.page, category: query.category, tag: query.tag, search: query.search });
      setData(res.data)
      const pageTitle = query.search ? `${query.search} - search` : '';
      const meta = createMeta({
        title: state.init?.siteSettings.name,
        url: state.init?.url,
        description: state.init?.siteSettings.description,
        image: state.init?.siteSettings.main_image,
      })
      const ldJson = createLdJsonTypeWebSite({ init: state.init });
      dispatch({ type: 'SET_PAGE_TITLE', payload: { pageTitle: pageTitle } })
      dispatch({ type: 'SET_META', payload: { meta: meta } })
      dispatch({ type: 'SET_LD_JSON', payload: { ldJson: [ldJson] } })
    } catch (e) {
      if (e.response && e.response.status) {
        pushError(e.response.status)
      }
    }

  }, [pushError, dispatch, query, state.init]);
  React.useEffect(() => {
    if (state.init) {
      fetchData();
    }
  }, [fetchData, state.init]);

  const handlePageChange = (page: number, pageSize?: number | undefined): void => {
    setQuery({
      category: query.category || undefined,
      tag: query.tag || undefined,
      page: page,
      search: query.search || undefined,
    }, 'push')
  }

  const PageResults: React.FC = () => {
    if ((query.page && query.page > 1) || query.search) {
      return (<PostListPageCountResults count={data?.count} query={query} />)
    }
    return <></>
  }

  return (
    <>
      {query.search && <PostListTitle title={`${query.search}`} subTitle="search" />}
      <PageResults />
      <PostListTemplate data={data} query={query} handlePageChange={handlePageChange} />
    </>
  );
};

export default Index;
