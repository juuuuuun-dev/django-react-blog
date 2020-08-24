import React from 'react';

import { PostListTilteProps } from '../../../types/posts';

const PostListTitle: React.FC<PostListTilteProps> = ({ title, subTitle }) => {
  return (
    <h3 className="list-title" data-testid="list-title">{title}
      {subTitle && <span className="list-title__sub">{subTitle}</span>}
    </h3>)
}

export default PostListTitle;