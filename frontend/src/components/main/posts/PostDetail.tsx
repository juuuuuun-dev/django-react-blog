import '../../../less/main/posts/postDetail.less';

import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { PostDetailProps } from '../../../types/posts';
import MarkdownContent from '../../common/MarkdownContent';
import { GoogleAds } from '../ads/GoogleAds';
import EntryData from './EntryData';

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  return React.useMemo(() => {
    return (
      <>
        <article className="post-detail">
          <h2 className="post-detail__title" data-testid='post-detail-title'>{post.title}</h2>
          <EntryData post={post} showUpdateAt={true} showCategory={true} showTag={true} />
          {post.cover_media && post.cover_media.cover &&
            <LazyLoadImage
              alt={post.title}
              data-testid="post-detail-cover"
              className="post-detail__cover"
              src={post.cover_media.cover}
            />
          }
          <GoogleAds
            client={process.env.REACT_APP_GOOGLE_ADS_CLIENT}
            slot={process.env.REACT_APP_GOOGLE_ADS_SLOG_POST_TOP_RECTANGLE}
            format="auto"
            style={{display:"inline-block", width:"300px", height: "250px"}}
            responsive={false}
          />
          <MarkdownContent name="post-detail" content={post.content} />
          <GoogleAds
            client={process.env.REACT_APP_GOOGLE_ADS_CLIENT}
            slot={process.env.REACT_APP_GOOGLE_ADS_SLOT_POST_TOP_HORIZONAL}
            format="auto"
          />
        </article>
      </>
    );
  }, [post])
};


export default PostDetail;
