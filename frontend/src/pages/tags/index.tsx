import React from 'react';
import { useParams } from 'react-router-dom';
import { NumberParam, useQueryParams } from 'use-query-params';

import PostList from '../../components/main/posts/PostList';
import PostListPageCountResults from '../../components/main/posts/PostListPageCountResults';
import PostListTitle from '../../components/main/posts/PostListTitle';
import { MainContext } from '../../context/mainContext';
import { useHistoryPushError } from '../../helper/useHistoryPushError';
import { tagPagelist } from '../../service/main/posts';
import { PostList as PostListType } from '../../types/posts';

const Index: React.FC = () => {
  const [pushError] = useHistoryPushError();
  const [data, setData] = React.useState<PostListType>();
  const [query, setQuery] = useQueryParams({ page: NumberParam });
  const { slug } = useParams();
  const context = React.useContext(MainContext);
  const dispatch = context[1];

  const fetchData = React.useCallback(async () => {
    try {
      const res = await tagPagelist(slug, { page: query.page });
      const pageNumberTitle = query.page ? `page ${query.page}` : ''
      dispatch({ type: 'SET_PAGE_TITLE', payload: { pageTitle: `Tag ${res.data.tag_name}` + pageNumberTitle } })
      setData(res.data)
    } catch (e) {
      if (e.response && e.response.status) {
        pushError(e.response.status)
      }
    }

  }, [pushError, query, slug]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (page: number, pageSize?: number | undefined): void => {
    setQuery({
      page: page,
    }, 'push')
  }

  return (
    <>
      <PostListTitle title={`Tag: ${data?.tag_name}`} />
      <PostListPageCountResults count={data?.count} query={query} />
      <PostList data={data} query={query} handlePageChange={handlePageChange} />
    </>
  )
}

export default Index