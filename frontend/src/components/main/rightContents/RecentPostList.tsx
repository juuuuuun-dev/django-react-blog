import { List, Typography } from 'antd';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

import { ClockCircleOutlined } from '@ant-design/icons';

import { RecentPostListProps } from '../../../types/rightContents';
import RightContentSection from './RightContentSection';

const RecentPostList: React.FC<RecentPostListProps> = ({ posts }) => {
  const { Paragraph } = Typography;

  return (
    <>
      {posts && <RightContentSection title="Recent posts">
        <List
          className="post-list"
          dataSource={posts}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={<Link to={`/posts/${item.id}`}><Paragraph
                  style={{ marginBottom: 0 }}
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
                    width={50}
                    src={`/assets/images/160.jpg`}
                  />
                </Link>
              </div>
            </List.Item>
          )}
        >
        </List>
        {/* {posts.map((value, index) => {
          return (<Link key={index} to={`/posts/${value.slug}`}>{value.title}</Link>)
        })} */}

      </RightContentSection>}
    </>
  )
}

export default RecentPostList;
