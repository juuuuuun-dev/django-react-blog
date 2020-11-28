import React from 'react';

import { SnsShareProps } from '../../../types/snsShare';

const HatenaButton: React.FC<SnsShareProps> = ({ title, url }) => {
  return (
    <>
      <a href={`https://b.hatena.ne.jp/entry/s/${url}`} title="このエントリーをはてなブックマークに追加" target="_blank" data-hatena-bookmark-title={title}>
        <span style={{ fontSize: 20, fontWeight: 'bold', color: "#444", }}>B!</span>
      </a>
    </>
  )
}

export default HatenaButton;
