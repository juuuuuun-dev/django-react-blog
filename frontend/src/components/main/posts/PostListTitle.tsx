import { Skeleton } from 'antd';
import React from 'react';

import { PostListTilteProps } from '../../../types/posts';

const PostListTitle: React.FC<PostListTilteProps> = ({ title, subTitle }) => {
  if (title !== "undefined") {
    return (
      <h3 className="list-title" data-testid="list-title">{title}
      {subTitle && <span className="list-title__sub">{subTitle}</span>}
    </h3>
    )
  } else {
    return (
      <>
        <div data-testid="list-title">
        <Skeleton.Input data-testid="list-title" style={{ width: 200, height: 25, marginBottom: 10 }} active={true} size={"small"} />
        </div>
      </>
    )
  }

}

export default PostListTitle;