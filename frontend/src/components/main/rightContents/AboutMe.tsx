import { Avatar, Col, Row } from 'antd';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

import { MainContext } from '../../../context/mainContext';
import { AboutMeProps } from '../../../types/rightContents';
import RightContentSection from './RightContentSection';

const AboutMe: React.FC<AboutMeProps> = ({ author }) => {
  const [{ init }] = React.useContext(MainContext);

  return (
    <>
      {author && <RightContentSection title="About me">
        <div className="right-contents-about-me" data-testid="right-contents-about-me">
          <Row className="right-contents-about-me__avatar">
            <Col flex="80px">
              {author.thumb && init && <Avatar size={60} src={`${author.thumb}`}></Avatar>}
            </Col>
            <Col flex="auto">
              <h3>{author.public_name}</h3>
            </Col>
          </Row>
          <p>{author.message}</p>
        </div>

      </RightContentSection>}
    </>
  )
}

export default AboutMe;
