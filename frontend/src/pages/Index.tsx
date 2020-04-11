import React from 'react';
import PostListItem from '../components/main/PostListItem'
import { list } from '../service/main/posts'
import { Card } from 'antd';
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';

const Index = () => {
  const { Meta } = Card;
  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await list();
    if (res.status === 200) {
      console.log({ res })
    }
  }
  return (
    <>
      <div className="post">
        <LazyLoadComponent>
          <Card
            hoverable
            style={{ width: "100%" }}
            cover={<img alt="test" src="/assets/images/photo-1436397543931-01c4a5162bdb-750x460.jpg" />}
          >
            <Meta title="Europe Street beat" />
          Wes Anderson banjo you probably haven’t heard of them cred, XOXO deep v kale chips Kickstarter viral. Swag meggings jean shorts chillwave seitan disrupt. Meditation flexitarian authentic organic, you probably haven’t heard of them taxidermy fap pop-up. Trust fund Tumblr Schlitz Banksy Austin squid. Paleo wayfarers twee ugh Sartorial street art gastropub pork belly tofu […]
        </Card>
        </LazyLoadComponent>
      </div>
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
        // cover={<img alt="test" src="/assets/images/b01-750x460.jpg" />}
        >
          <Meta title="Europe Street beat" description="Wes Anderson banjo you probably haven’t heard of them cred, XOXO deep v kale chips Kickstarter viral. Swag meggings jean shorts chillwave seitan disrupt. Meditation flexitarian authentic organic, you probably haven’t heard of them taxidermy fap pop-up. Trust fund Tumblr Schlitz Banksy Austin squid. Paleo wayfarers twee ugh Sartorial street art gastropub pork belly tofu […]" />
        </Card>
      </div>
      <div className="post">
        <Card
          hoverable
          style={{ width: "100%" }}
          cover={
            <LazyLoadImage
              alt="test"
              src={`/assets/images/photo-1436397543931-01c4a5162bdb-750x460.jpg`}
            />
          }
        // cover={<img alt="test" src="/assets/images/photo-1436397543931-01c4a5162bdb-750x460.jpg" />}
        >
          <Meta title="Europe Street beat" description="Wes Anderson banjo you probably haven’t heard of them cred, XOXO deep v kale chips Kickstarter viral. Swag meggings jean shorts chillwave seitan disrupt. Meditation flexitarian authentic organic, you probably haven’t heard of them taxidermy fap pop-up. Trust fund Tumblr Schlitz Banksy Austin squid. Paleo wayfarers twee ugh Sartorial street art gastropub pork belly tofu […]" />
        </Card>
      </div>
      <div className="post">
        <Card
          hoverable
          style={{ width: "100%" }}
          cover={
            <LazyLoadImage
              alt="test"
              src={`/assets/images/untold0171-750x460.jpg`}
            />
          }
        // cover={<img alt="test" src="/assets/images/untold0171-750x460.jpg" />}
        >
          <Meta title="Europe Street beat" description="Wes Anderson banjo you probably haven’t heard of them cred, XOXO deep v kale chips Kickstarter viral. Swag meggings jean shorts chillwave seitan disrupt. Meditation flexitarian authentic organic, you probably haven’t heard of them taxidermy fap pop-up. Trust fund Tumblr Schlitz Banksy Austin squid. Paleo wayfarers twee ugh Sartorial street art gastropub pork belly tofu […]" />
        </Card>
      </div>
      <div className="post">
        <Card
          hoverable
          style={{ width: "100%" }}
          cover={<img alt="test" src="/assets/images/b01-750x460.jpg" />}
        >
          <Meta title="Europe Street beat" description="Wes Anderson banjo you probably haven’t heard of them cred, XOXO deep v kale chips Kickstarter viral. Swag meggings jean shorts chillwave seitan disrupt. Meditation flexitarian authentic organic, you probably haven’t heard of them taxidermy fap pop-up. Trust fund Tumblr Schlitz Banksy Austin squid. Paleo wayfarers twee ugh Sartorial street art gastropub pork belly tofu […]" />
        </Card>
      </div>
      <div className="post">
        <LazyLoadComponent afterLoad={() => console.log("as")}>
          <Card
            hoverable
            style={{ width: "100%" }}
            cover={<img alt="test" src="/assets/images/photo-1436397543931-01c4a5162bdb-750x460.jpg" />}
          >
            <Meta title="Europe Street beat" description="Wes Anderson banjo you probably haven’t heard of them cred, XOXO deep v kale chips Kickstarter viral. Swag meggings jean shorts chillwave seitan disrupt. Meditation flexitarian authentic organic, you probably haven’t heard of them taxidermy fap pop-up. Trust fund Tumblr Schlitz Banksy Austin squid. Paleo wayfarers twee ugh Sartorial street art gastropub pork belly tofu […]" />
          </Card>
        </LazyLoadComponent>
      </div>
    </>
  );
};

export default Index;
