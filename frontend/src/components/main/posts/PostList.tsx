import '../../../less/main/posts/postList.less';

import { List, Pagination, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

import { ApartmentOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { MainContext } from '../../../context/mainContext';
import { PostListProps } from '../../../types/posts';

const PostList: React.FC<PostListProps> = ({ data, query, handlePageChange }) => {
  const [{ init, dateFormat }] = React.useContext(MainContext);
  const { Paragraph } = Typography;
  console.log(init?.paginationSize);
  return (
    <>
      <List
        className="post-list"
        data-testid="post-list"
        dataSource={data?.results}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={<Link to={`/posts/${item.id}`}><Paragraph
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
                  <Link to={`/posts/${item.id}`}>{item.plain_content}</Link>
                </Paragraph>
                <div className="entry-date">
                  <span className="entry-date__item"><ClockCircleOutlined />{moment(item.created_at).format(dateFormat)}</span>
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
      <Pagination
        total={data?.count}
        pageSize={init?.paginationSize || 1}
        defaultCurrent={query.page || 1}
        current={query.page || 1}
        onChange={handlePageChange}
      />
    </>
  )
};


export default PostList;
