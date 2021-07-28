import React from 'react';

import { GoogleAds } from '../ads/GoogleAds';

export const RightVerticalAds: React.FC = () => {
  return (
    <>
      <div style={{margin: "0 auto"}}>
        <GoogleAds
          client={process.env.REACT_APP_GOOGLE_ADS_CLIENT}
          slot={process.env.REACT_APP_GOOGLE_ADS_SLOT_RIGHT}
          format="vertical"
        />
      </div>
    </>
  )
}

