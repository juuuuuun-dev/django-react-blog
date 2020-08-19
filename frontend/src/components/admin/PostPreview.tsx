import React from 'react';

import { PostPreviewProps } from '../../types/posts';
import MarkdownContent from '../common/MarkdownContent';

const PostPreview: React.FC<PostPreviewProps> = ({ title, content, cover }) => {
  return (
    <div>

      <h4>Preview</h4>
      <div className="preview" data-testid="post-preview">
        {cover && <img src={cover} data-testid="post-preview-cover" alt="preview" />}
        <h2>{title}</h2>
        <MarkdownContent content={content} />
      </div>
    </div>
  )
}

export default PostPreview;