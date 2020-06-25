import React from 'react';

import { RightContentsSectionProps } from '../../../types/rightContents';

const RightContentSection: React.FC<RightContentsSectionProps> = ({ title, children }) => {
  return (
    <div className="right-contents-section">
      <h3 className="right-contents-section__title">{title}</h3>
      {children}
    </div>
  )
}

export default RightContentSection;
