import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { List, Typography } from 'antd'
import { PostListProps } from '../../types/posts';
import '../../less/main/postList.less'

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
              <span style={{ fontSize: ".7rem" }}>{item.created_at} | {item.category.name}</span>

            </>}
          />
          <div className="post-list__thumb">
            {/* sp 80 pc 160 */}
            <Link to={`/post/${item.id}`}>
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
