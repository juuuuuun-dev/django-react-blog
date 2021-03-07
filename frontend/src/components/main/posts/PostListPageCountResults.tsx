import { Skeleton } from 'antd';
import React from 'react';

import { PostListPageCountResultsProps } from '../../../types/posts';

const PostListPageCountResults: React.FC<PostListPageCountResultsProps> = ({ count, query }) => {
  if (count) {
    return (
      <ul className="page-resutls" data-testid="post-list-page-count-results">
        {query.page && query.page > 1 && <li>Page: {query.page}</li>}
        <li>({count} results)</li>
      </ul>
    )
  } else if (count === 0) {
    return (
      <ul className="page-resutls" data-testid="post-list-page-count-results">
        <li>(0 results)</li>
      </ul>
    )
  } else {
    return (<Skeleton.Input style={{ width: 70, height: 20, marginBottom: 60 }} active={true} size={"small"} />)
  }
}

export default PostListPageCountResults;
