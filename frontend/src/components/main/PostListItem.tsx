import React from 'react';
import { Card, Typography } from 'antd';
import { PostDetail } from '../../types/posts'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useHistory } from 'react-router-dom';

interface IProps {
  post: PostDetail;
}

const PostListItem: React.FC<IProps> = ({ post }) => {
  const { Meta } = Card;
  const history = useHistory();
  const { Paragraph } = Typography;
  return (
    <>
      <div className="post post-list">
        <Card
          hoverable
          style={{ width: "100%" }}
          onClick={() => history.push(`/post/${post.id}`)}
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
            ellipsis={{
              rows: 2,
              expandable: false,
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
