import React from 'react';

import { useWindowSize } from '@react-hook/window-size';

import { MainContext } from '../../../context/mainContext';
import { HorizonalOrRectangleAdsProps } from '../../../types/ads';
import { GoogleAds } from './GoogleAds';

export const HorizonalOrRectangleAds: React.FC<HorizonalOrRectangleAdsProps> = ({ horizonalSlot, rectangleSlot }) => {
  const [width] = useWindowSize();
  const [{ breakPoint }] = React.useContext(MainContext);
  return React.useMemo(() => {
    return (
      <GoogleAds
        classStr="rectangle"
        client={process.env.REACT_APP_GOOGLE_ADS_CLIENT}
        slot={rectangleSlot}
        format="rectangle"
      />
    )
    // if (width > breakPoint.sm) {
    //   return (
    //     <GoogleAds
    //       client={process.env.REACT_APP_GOOGLE_ADS_CLIENT}
    //       slot={horizonalSlot}
    //       format="horizonal"
    //     />
    //   )
    // } else {
    //   return (
    //     <GoogleAds
    //       classStr="rectangle"
    //       client={process.env.REACT_APP_GOOGLE_ADS_CLIENT}
    //       slot={rectangleSlot}
    //       format="rectangle"
    //     />
    //   )
    // }
  }, [rectangleSlot])
}