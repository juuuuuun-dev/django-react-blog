import '../../../less/main/posts/postList.less';

import { List, Pagination, Skeleton, Typography } from 'antd';
import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

import { MainContext } from '../../../context/mainContext';
import { PostListProps } from '../../../types/posts';
import EntryData from './EntryData';

const PostList: React.FC<PostListProps> = ({ data, query, handlePageChange }) => {
  const [{ init, temporaryPostList, breakPoint }] = React.useContext(MainContext);
  const { Paragraph } = Typography;
  return React.useMemo(() => {
    return (
      <>
        <List
          className="post-list"
          data-testid="post-list"
          dataSource={data?.results || temporaryPostList}
          renderItem={(item, index) => (
            <List.Item key={item.id} data-testid={`post-list-item-${index}`}>
              <Skeleton loading={data?.results ? false : true} active>
                <List.Item.Meta
                  title={
                    <Link to={`/posts/${item.slug}`}>
                      <Paragraph
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
                  description={
                    <>
                      <Paragraph
                        ellipsis={{
                          rows: 2,
                          expandable: false,
                        }}
                        className="post-list__description"
                        title={`${item.plain_content}`}
                      >
                        <Link to={`/posts/${item.slug}`} title={item.title}>{item.plain_content}</Link>
                      </Paragraph>
                      <EntryData post={item} showCategory={true} />
                    </>
                  }
                />
                {item.cover_media && item.cover_media.cover && (
                  <div className="post-list__thumb">
                    <Link to={`/posts/${item.slug}`}>
                      <LazyLoadComponent>
                        <picture>
                          <source
                            media={`(max-width: ${breakPoint.sm - 1}px)`}
                            srcSet={`${item.cover_media.cover} 2x`}
                          ></source>
                          <source
                            media={`(min-width: ${breakPoint.sm}px)`}
                            srcSet={`${item.cover_media.cover_mini} 1x`}
                          ></source>
                          <img width={80} height={80} alt={item.title} src={item.cover_media.cover} />
                        </picture>
                      </LazyLoadComponent>
                    </Link>
                  </div>
                )}
              </Skeleton>
            </List.Item>
          )}
        ></List>
        {(data?.links.next || data?.links.previous) && (
          <Pagination
            total={data?.count}
            data-testid="post-pagination"
            pageSize={init?.pageSize || 1}
            defaultCurrent={query.page || 1}
            current={query.page || 1}
            onChange={handlePageChange}
          />
        )}
      </>
    );
  }, [data, init, breakPoint, temporaryPostList, query, handlePageChange]);
};

export default PostList;
