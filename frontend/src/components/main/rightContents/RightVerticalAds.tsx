import React from 'react';

import { useWindowSize } from '@react-hook/window-size';

import { MainContext } from '../../../context/mainContext';
import { GoogleAds } from '../ads/GoogleAds';

export const RightVerticalAds: React.FC = () => {
  const [width] = useWindowSize();
  const [{ breakPoint }] = React.useContext(MainContext);
  return React.useMemo(() => {
    if (width > breakPoint.lg) {
      return (
        <>
          <GoogleAds
            client={process.env.REACT_APP_GOOGLE_ADS_CLIENT}
            slot={process.env.REACT_APP_GOOGLE_ADS_SLOT_RIGHT}
            format="vertical"
          />
        </>
      )
    }
    return null;
  }, [width, breakPoint])
}

