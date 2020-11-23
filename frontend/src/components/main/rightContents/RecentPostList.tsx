import { List, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

import { ClockCircleOutlined } from '@ant-design/icons';

import { MainContext } from '../../../context/mainContext';
import { RecentPostListProps } from '../../../types/components/main/rightContents';
import RightContentSection from './RightContentSection';

const RecentPostList: React.FC<RecentPostListProps> = ({ posts }) => {
  const [{ dateFormat }] = React.useContext(MainContext);
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
                  <ul className="entry-date">
                    <li className="entry-date__item"><ClockCircleOutlined />{moment(item.created_at).format(dateFormat)}</li>
                    {/* <li className="entry-date__item"><ApartmentOutlined />{item.category.name}</li> */}
                  </ul>
                </>}
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
