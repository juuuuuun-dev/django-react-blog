import '../../../less/main/posts/postList.less';

import { List, Skeleton, Typography } from 'antd';
import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

import { MainContext } from '../../../context/mainContext';
import { PostListProps } from '../../../types/posts';
import EntryData from './EntryData';

const PostList: React.FC<PostListProps> = ({ data, loading, media_size, showDate, descriptionRows }) => {
  const { Paragraph } = Typography;
  const [{ breakPoint }] = React.useContext(MainContext);

  return React.useMemo(() => {
    return (
      <>
        <List
          className="post-list"
          data-testid="post-list"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item key={item.id} data-testid={`post-list-item-${index}`}>
              <Skeleton avatar loading={loading} active>
                <List.Item.Meta
                avatar={item.cover_media && item.cover_media.cover && (
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
                          <img width={media_size && media_size.cover.width / 2} height={media_size && media_size.cover.height / 2} alt={item.title} src={item.cover_media.cover} />
                        </picture>
                      </LazyLoadComponent>
                    </Link>
                  </div>
                )}
                
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
                          rows: descriptionRows,
                          expandable: false,
                        }}
                        className="post-list__description"
                        title={`${item.plain_content}`}
                      >
                        <Link to={`/posts/${item.slug}`} title={item.title}>{item.plain_content}</Link>
                      </Paragraph>
                      {showDate && <EntryData post={item} showCategory={true} />}
                    </>
                  }
                />
                {/* {item.cover_media && item.cover_media.cover && (
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
                          <img width={data && data.media_size.cover.width / 2} height={data && data.media_size.cover.height / 2} alt={item.title} src={item.cover_media.cover} />
                        </picture>
                      </LazyLoadComponent>
                    </Link>
                  </div>
                )} */}
              </Skeleton>
            </List.Item>
          )}
        ></List>
        </>
    );
  }, [data, breakPoint, loading, media_size, descriptionRows, showDate]);
};

export default PostList;
