import '../../../less/main/posts/postList.less';

import { List, Pagination, Typography } from 'antd';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import { ApartmentOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { MainContext } from '../../../context/mainContext';
import { useHistoryPushError } from '../../../helper/useHistoryPushError';
import { list } from '../../../service/main/posts';
import { PostList as PostListType } from '../../../types/posts';

const PostList: React.FC = () => {
  const [{ pageSize }, dispatch] = React.useContext(MainContext);
  const { Paragraph } = Typography;
  const [data, setData] = React.useState<PostListType>();
  const [query, setQuery] = useQueryParams({ category: NumberParam, tag: NumberParam, search: StringParam, page: NumberParam });
  const [pushError] = useHistoryPushError();

  const fetchData = React.useCallback(async () => {
    try {
      const res = await list({ page: query.page, category: query.category, tag: query.tag, search: query.search });
      setData(res.data)
    } catch (e) {
      if (e.response && e.response.status) {
        pushError(e.response.status)
      }
    }

  }, [pushError, query]);
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (page: number, pageSize?: number | undefined): void => {
    setQuery({
      category: query.category || undefined,
      tag: query.tag || undefined,
      page: page,
      search: query.search || undefined,
    }, 'push')
  }


  return (
    <>
      <List
        className="post-list"
        dataSource={data?.results}
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
      <Pagination
        total={data?.count}
        pageSize={pageSize}
        defaultCurrent={query.page || 1}
        current={query.page || 1}
        onChange={handlePageChange}
      />
    </>
  )
};


export default PostList;
