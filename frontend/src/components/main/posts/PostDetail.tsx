import '../../../less/main/posts/postDetail.less';

import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { PostDetailProps } from '../../../types/posts';
import MarkdownContent from '../../common/MarkdownContent';
import EntryData from './EntryData';

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  return React.useMemo(() => {
    return (
      <>
        <article className="post-detail">
          <h2 className="post-detail__title" data-testid='post-detail-title'>{post.title}</h2>
          <EntryData post={post} showUpdateAt={true} showCategory={true} showTag={true} />
          {post.cover_media.cover &&
            <LazyLoadImage
              alt={post.title}
              data-testid="post-detail-cover"
              className="post-detail__cover"
              src={post.cover_media.cover}
            />
          }
          <MarkdownContent content={post.content} />
        </article>
      </>
    );
  }, [post])
};


export default PostDetail;
