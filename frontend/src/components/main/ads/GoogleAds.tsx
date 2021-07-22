import React from 'react';

import { GoogleAdsProps } from '../../../types/googleAds';

export const GoogleAds: React.FC<GoogleAdsProps> = ({ client, slot }) => {
  React.useEffect(() => {
    if (window.adsbygoogle && process.env.NODE_ENV !== "development") {
        window.adsbygoogle.push({});
    }
  }, []);

  return React.useMemo(() => {
    if (client && slot) {
      return (
        <>
          <ins className="adsbygoogle"
            style={{ "display": "block" }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </>
      );
    } else {
      return(<></>)
    }
  }, [client, slot]);
}
