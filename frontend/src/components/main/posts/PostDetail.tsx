import '../../../less/main/posts/postDetail.less';

import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { ApartmentOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { PostDetailProps } from '../../../types/posts';
import PostDetaiLContent from './PostDetailContent';

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  return (
    <>
      <div className="post-detail">
        <LazyLoadImage
          alt="test"
          className="post-detail__cover"
          src={`/assets/images/160.jpg`}
        />
        <h2 className="post-detail__title">{post.title}</h2>
        <div className="entry-date">
          <span className="entry-date__item"><ClockCircleOutlined />{post.created_at}</span>
          {/* <span className="entry-date__item"><ApartmentOutlined />{post.category}</span> */}
        </div>
        <PostDetaiLContent content={post.content} />

      </div>
    </>
  );
};


export default PostDetail;
