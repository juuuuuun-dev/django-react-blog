import React from 'react';
import { Helmet } from 'react-helmet';

import { MetaHeadProps } from '../../types/meta';

const MetaHead: React.FC<MetaHeadProps> = ({ appTitle, pageTitle, meta, jsonLd }) => {
  // https://developers.google.com/search/docs/data-types/breadcrumb?hl=ja
  // https://search.google.com/test/rich-results?utm_campaign=sdtt&utm_medium=message

  appTitle = appTitle || process.env.REACT_APP_TITLE;
  return React.useMemo(() => {
    return (
      <>
        {meta && <Helmet meta={meta} />}
        <Helmet
          data-testid="helmet"
          defaultTitle={appTitle} titleTemplate={`%s | ${appTitle}`}
        >
          <meta charSet='utf-8' />
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@graph": jsonLd,
          })}</script>
          {pageTitle && <title>{pageTitle}</title>}
        </Helmet>
      </>
    )
  }, [appTitle, pageTitle, meta, jsonLd])
}

export default MetaHead;