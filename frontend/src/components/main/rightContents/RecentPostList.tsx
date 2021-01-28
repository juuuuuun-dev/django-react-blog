import { List, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { RecentPostListProps } from '../../../types/components/main/rightContents';
import EntryData from '../posts/EntryData';
import RightContentSection from './RightContentSection';

const RecentPostList: React.FC<RecentPostListProps> = ({ posts }) => {
  const { Paragraph } = Typography;

  return (
    <>
      {posts && <RightContentSection title="Recent posts">
        <List
          className="recent-post-list"
          data-testid="recent-post-list"
          dataSource={posts}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={<Link to={`/posts/${item.slug}`}><Paragraph
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
                description={<EntryData post={item} />}
              />
              {/* <div className="post-list__thumb">
                <Link to={`/posts/${item.id}`}>
                  <LazyLoadImage
                    alt="test"
                    width={50}
                    src={`/assets/images/160.jpg`}
                  />
                </Link>
              </div> */}
            </List.Item>
          )}
        >
        </List>
      </RightContentSection>}
    </>
  )
}

export default RecentPostList;
