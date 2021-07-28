import React from 'react';

import { GoogleAdsProps } from '../../../types/googleAds';

export const GoogleAds: React.FC<GoogleAdsProps> = ({ client, slot, format, classStr }) => {

  React.useEffect(() => {
    if (window.adsbygoogle && process.env.NODE_ENV !== "development") {
        window.adsbygoogle.push({});
    }
  }, []);

  return React.useMemo(() => {
    return (
      <>
        <ins className={`adsbygoogle ${classStr}`}
          style={{ "display": "block" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"></ins>
      </>
    );
  }, [client, slot, format, classStr]);
}
