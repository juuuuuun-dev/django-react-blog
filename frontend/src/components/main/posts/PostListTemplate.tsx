import '../../../less/main/posts/postList.less';

import { Pagination } from 'antd';
import React from 'react';

import { MainContext } from '../../../context/mainContext';
import { MediaSize, PostListTemplateProps } from '../../../types/posts';
import PostList from './PostList';

const PostListTemplate: React.FC<PostListTemplateProps> = ({ data, query, handlePageChange }) => {
  const [{ init, temporaryPostList }] = React.useContext(MainContext);
  const [list, setList] = React.useState(data?.results || temporaryPostList)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [mediaSize, setMediaSize] = React.useState<MediaSize>(data?.media_size)
  React.useEffect(() => {
    if (data?.results) {
      setList(data?.results)
      setMediaSize(data.media_size)
      setLoading(false)
    }
  }, [data, setList, setLoading]);

  const handlePagination = React.useCallback((arg) => {
    setList(temporaryPostList);
    setLoading(true);
    handlePageChange(arg);
  }, [handlePageChange, temporaryPostList]);

  return React.useMemo(() => {
    return (
      <>
        <PostList data={list} loading={loading} media_size={mediaSize} showDate={true} descriptionRows={1} />
        {(data?.links.next || data?.links.previous) && (
          <Pagination
            total={data?.count}
            data-testid="post-pagination"
            pageSize={init?.pageSize || 1}
            defaultCurrent={query.page || 1}
            current={query.page || 1}
            onChange={handlePagination}
          />
        )}
      </>
    );
  }, [data, init, query, list, loading, mediaSize, handlePagination]);
};

export default PostListTemplate;
