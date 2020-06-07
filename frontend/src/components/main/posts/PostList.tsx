import '../../../less/main/posts/postList.less';

import { List, Typography } from 'antd';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

import { ApartmentOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { PostListProps } from '../../../types/posts';

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const { Paragraph } = Typography;
  return (
    <List
      className="post-list"
      dataSource={posts}
      renderItem={item => (
        <List.Item key={item.id}>
          <List.Item.Meta
            title={<Link to={`/post/${item.id}`}><Paragraph
              ellipsis={{
                rows: 2,
                expandable: false,
              }}
              className="post-list__title"
              title={`${item.title}`}
            >
              {item.title}
            </Paragraph>
            </Link>
            }
            description={<>
              <Paragraph
                ellipsis={{
                  rows: 2,
                  expandable: false,
                }}
                className="post-list__description"
                title={`${item.plain_content}`}
              >
                <Link to={`/post/${item.id}`}>{item.plain_content}</Link>
              </Paragraph>
              <div className="entry-date">
                <span className="entry-date__item"><ClockCircleOutlined />{item.created_at}</span>
                {/* <span className="entry-date__item"><ApartmentOutlined />{item.category}</span> */}
              </div>
            </>}
          />
          <div className="post-list__thumb">
            {/* sp 80 pc 160 */}
            <Link to={`/posts/${item.id}`}>
              <LazyLoadImage
                alt="test"
                width={80}
                src={`/assets/images/160.jpg`}
              />
            </Link>
          </div>
        </List.Item>
      )}
    >
    </List>
  )
};


export default PostList;
