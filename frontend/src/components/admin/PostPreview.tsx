import React from 'react'
import PostDetailContent from '../main/posts/PostDetailContent'
import { PostPreviewProps } from '../../types/posts'

const PostPreview: React.FC<PostPreviewProps> = ({ title, content, cover }) => {
  return (
    <div>
      <h4>Preview</h4>
      <div className="preview">
        <h2>{title}</h2>
        <PostDetailContent content={content} />
      </div>
    </div>
  )
}

export default PostPreview;