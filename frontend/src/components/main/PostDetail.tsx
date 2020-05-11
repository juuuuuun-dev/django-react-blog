import React from 'react';
import { Card } from 'antd';
import { PostDetailProps } from '../../types/posts'
import * as Showdown from "showdown";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  const { Meta } = Card;
  // const { Paragraph } = Typography;

  return (
    <>
      <div className="post">
        <Card
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
          <div className="content" dangerouslySetInnerHTML={{ __html: converter.makeHtml(post.content) }}></div>
        </Card>
      </div>
    </>
  );
};


export default PostDetail;
