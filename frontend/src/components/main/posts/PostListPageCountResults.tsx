import React from 'react';

import { PostListPageCountResultsProps } from '../../../types/posts';

const PostListPageCountResults: React.FC<PostListPageCountResultsProps> = ({ count, query }) => {
  if (count) {
    return (
      <ul className="page-resutls">
        {query.page && query.page > 1 && <li>Page: {query.page}</li>}
        <li>({count} results)</li>
      </ul>
    )
  }
  return (
    <ul className="page-resutls">
      <li>(0 results)</li>
    </ul>
  )
}

export default PostListPageCountResults;
