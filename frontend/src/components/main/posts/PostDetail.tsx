import '../../../less/main/posts/postDetail.less';

import { Tag } from 'antd';
import moment from 'moment';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

import {
    ApartmentOutlined, ClockCircleOutlined, SyncOutlined, TagOutlined
} from '@ant-design/icons';

import { MainContext } from '../../../context/mainContext';
import { PostDetailProps } from '../../../types/posts';
import MarkdownContent from '../../common/MarkdownContent';

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  const [{ dateFormat }] = React.useContext(MainContext);

  return (
    <>
      <article className="post-detail">
        <h2 className="post-detail__title" data-testid='post-detail-title'>{post.title}</h2>
        <ul className="entry-date">
          <li className="entry-date__item">
            <time itemProp="datePublished" dateTime={post.created_at}><ClockCircleOutlined />{moment(post.created_at).format(dateFormat)}</time>
            {moment(post.created_at).format(dateFormat) !== moment(post.updated_at).format(dateFormat) && <time itemProp="dateModified" style={{ marginLeft: 10 }} dateTime={post.updated_at}> <SyncOutlined />{moment(post.updated_at).format(dateFormat)}</time>}
          </li>
          <li className="entry-date__item"><Link to={`/categories/${post.category.slug}`}><ApartmentOutlined />{post.category.name}</Link></li>
          <li className="entry-date__item"><TagOutlined />
            {post.tag.map((value, index) => {
              return <Link style={{ marginRight: 10 }} to={`tags/${value.slug}`} key={index}>{value.name}</Link>
            })}
          </li>
        </ul>
        {post.cover_media.cover &&
          <LazyLoadImage
            alt="test"
            className="post-detail__cover"
            src={post.cover_media.cover}
          />
        }


        <MarkdownContent content={post.content} />
      </article>
    </>
  );
};


export default PostDetail;
