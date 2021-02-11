import React from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';

import { SnsShareProps } from '../../../types/snsShare';
import HatenaButton from './HatenaButton';

const SnsShare: React.FC<SnsShareProps> = ({ title, url, color = "#666", fontSize = 18 }) => {
  return (
    <>
      <TwitterShareButton title={title + "\n"} via="-" url={url} style={{ marginRight: 25, outline: 'none' }}>
        <TwitterOutlined style={{ fontSize: fontSize, color: color }} />
      </TwitterShareButton>
      <FacebookShareButton url={url} quote={title} style={{ marginRight: 25, outline: 'none' }}>
        <FacebookOutlined style={{ fontSize: fontSize, color: color, }} />
      </FacebookShareButton>
      <HatenaButton url={url} title={title} color={color} fontSize={fontSize} />
    </>
  )
}

export default SnsShare;
