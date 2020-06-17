import React from 'react';

import { PostListPageCountResultsProps } from '../../../types/posts';

const PostListPageCountResults: React.FC<PostListPageCountResultsProps> = ({ data, query }) => {
  if ((query.page && query.page > 1) || query.search) {
    if (data?.count) {
      return (
        <ul className="page-resutls">
          {query.page && query.page > 1 && <li>Page: {query.page}</li>}
          {query.search && data?.count && <li>({data?.count} results)</li>}
        </ul>
      )
    }
    return (
      <ul className="page-resutls">
        <li>(0 results)</li>
      </ul>
    )
  }
  return <></>
}

export default PostListPageCountResults;
