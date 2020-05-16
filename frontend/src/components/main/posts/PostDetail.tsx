import React from 'react';
import { PostDetailProps } from '../../../types/posts'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ClockCircleOutlined, ApartmentOutlined } from '@ant-design/icons';
import PostDetaiLContent from './PostDetailContent';
import '../../../less/main/posts/postDetail.less'

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
          <span className="entry-date__item"><ApartmentOutlined />{post.category.name}</span>
        </div>
        <PostDetaiLContent content={post.content} />

      </div>
    </>
  );
};


export default PostDetail;
