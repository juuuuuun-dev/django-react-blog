import '../../../less/main/posts/postDetail.less';

import moment from 'moment';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { ApartmentOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { MainContext } from '../../../context/mainContext';
import { PostDetailProps } from '../../../types/posts';
import MarkdownContent from '../../common/MarkdownContent';

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  const [{ dateFormat }] = React.useContext(MainContext);

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
          <span className="entry-date__item"><ClockCircleOutlined />{moment(post.created_at).format(dateFormat)}
            {moment(post.created_at).format(dateFormat) !== moment(post.updated_at).format(dateFormat) && <span> (updated: {moment(post.updated_at).format(dateFormat)})</span>}
          </span>
        </div>
        <MarkdownContent content={post.content} />
      </div>
    </>
  );
};


export default PostDetail;
