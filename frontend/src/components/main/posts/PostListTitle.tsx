import React from 'react';

const PostListTitle: React.FC<{ title: string }> = ({ title }) => {
  return <h3 className="list-title">{title}</h3>
}

export default PostListTitle;