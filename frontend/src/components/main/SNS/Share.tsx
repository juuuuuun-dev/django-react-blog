import React from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';

import { SnsShareProps } from '../../../types/snsShare';
import HatenaButton from './HatenaButton';

const SnsShare: React.FC<SnsShareProps> = ({ title, url, color = "#666" }) => {
  return (
    <>
      <TwitterShareButton title={title + "\n"} via="-" url={url} style={{ marginRight: 20, outline: 'none' }}>
        <TwitterOutlined style={{ fontSize: 22, color: color }} />
      </TwitterShareButton>
      <FacebookShareButton url={url} quote={title} style={{ marginRight: 20, outline: 'none' }}>
        <FacebookOutlined style={{ fontSize: 22, color: color, }} />
      </FacebookShareButton>
      <HatenaButton url={url} title={title} color={color} />
    </>
  )
}

export default SnsShare;
