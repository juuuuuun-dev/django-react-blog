import '../../less/tag.less';

import React, { useMemo } from 'react';

import { TagProps } from '../../types/components/common/tag';

export const Tag: React.FC< TagProps> = ({active, children}) => {
  return useMemo(() => {
    let activeStr = ''
    if (active) {
      activeStr = 'active';
    }
    return (
      <>
        <div className={`my-tag ${activeStr}`}>{children}</div>
      </>
    )
  }, [active, children])
}