import '../../../less/main/posts/postList.less';

import { List, Pagination, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

import { ApartmentOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { MainContext } from '../../../context/mainContext';
import { PostListProps } from '../../../types/posts';

const PostList: React.FC<PostListProps> = ({ data, query, handlePageChange }) => {
  const [{ init, breakPoint, dateFormat }] = React.useContext(MainContext);
  const { Paragraph } = Typography;
  return React.useMemo(() => {
    return (
      <>
        <List
          className="post-list"
          data-testid="post-list"
          dataSource={data?.results}
          renderItem={(item, index) => (
            <List.Item
              key={item.id} data-testid={`post-list-item-${index}`}
            >
              <List.Item.Meta
                title={<Link to={`/posts/${item.id}`}><Paragraph
                  ellipsis={{
                    rows: 2,
                    expandable: false,
                  }}
                  className="post-list__title"
                  data-testid={`post-list-link-${item.id}`}
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
                    <Link to={`/posts/${item.id}`}>{item.plain_content}</Link>
                  </Paragraph>
                  <div className="entry-date">
                    <span className="entry-date__item"><ClockCircleOutlined />{moment(item.created_at).format(dateFormat)}</span>
                    <span className="entry-date__item"><ApartmentOutlined />{item.category.name}</span>
                  </div>
                </>}
              />
              {item.cover_media.cover &&
                <div className="post-list__thumb">
                  <Link to={`/posts/${item.id}`}>
                    <LazyLoadComponent>
                      <picture>
                        <source media={`(max-width: ${breakPoint.sm - 1}px)`} srcSet={`${item.cover_media.cover} 2x`}></source>
                        <source media={`(min-width: ${breakPoint.sm}px)`} srcSet={`${item.cover_media.cover_mini} 1x`}></source>
                        <img width={80} alt={item.title} src={item.cover_media.cover} />
                      </picture>
                    </LazyLoadComponent>
                  </Link>
                </div>
              }
            </List.Item>
          )}
        >
        </List>
        <Pagination
          total={data?.count}
          pageSize={init?.pageSize || 1}
          defaultCurrent={query.page || 1}
          current={query.page || 1}
          onChange={handlePageChange}
        />
      </>
    )
  }, [data, init, dateFormat, breakPoint, query, handlePageChange])
};


export default PostList;
