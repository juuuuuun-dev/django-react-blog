import { Avatar, Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import MarkdownContent from '../../../components/common/MarkdownContent';
import { MainContext } from '../../../context/mainContext';
import { AboutMeProps } from '../../../types/components/main/rightContents';
import RightContentSection from './RightContentSection';

const AboutMe: React.FC<AboutMeProps> = ({ author }) => {
  const [{ init }] = React.useContext(MainContext);

  return (
    <>
      {author && <RightContentSection title="About me">
        <div className="right-contents-about-me" data-testid="right-contents-about-me">
          <Row className="right-contents-about-me__avatar">
            <Col flex="40px">
              {author.thumb && init && <Link to="/about" title="About me"><Avatar className="right-contents-about-me__avatar-image" size={30} src={`${author.thumb}`} alt={author.public_name}></Avatar></Link>}
            </Col>
            <Col flex="auto">
              <h3><Link data-testid="right-contents-about-me-name" to="/about">{author.public_name}</Link></h3>
            </Col>
          </Row>
          <MarkdownContent name="message" content={author?.message}></MarkdownContent>
        </div>

      </RightContentSection>}
    </>
  )
}

export default AboutMe;
