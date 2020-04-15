import React from 'react';
import { Card, Typography } from 'antd';
import { IPostListData } from '../../types/posts'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
interface IProps {
  post: IPostListData;
}

const PostListItem: React.FC<IProps> = ({ post }) => {
  const { Meta } = Card;
  const { Paragraph } = Typography;
  return (
    <>
      <div className="post">
        <Card
          hoverable
          style={{ width: "100%" }}
          cover={
            <LazyLoadImage
              alt="test"
              src={`/assets/images/b01-750x460.jpg`}
            />
          }
        >
          <Meta
            title={post.title}
            description={`${post.created_at} | ${post.category.name} | `}
          />
          <Paragraph
            style={{ maxWidth: "780px" }}
            ellipsis={{
              rows: 2,
              expandable: false,
              // suffix: '[..]',
            }}
            title={`${post.plain_content}`}
          >
            {post.plain_content}
          </Paragraph>
        </Card>
      </div>
    </>
  );
};


export default PostListItem;
