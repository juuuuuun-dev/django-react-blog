import React from 'react';
import { Helmet } from 'react-helmet';

import { metaHeadProps } from '../../types/components/common/metaHead';

const MetaHead: React.FC<metaHeadProps> = ({ pageTitle, description, meta }) => {
  const appTitle = process.env.REACT_APP_TITLE;
  return React.useMemo(() => {
    return (
      <>
        {meta && <Helmet meta={meta} />}
        <Helmet data-testid="helmet" defaultTitle={appTitle} titleTemplate={`%s | ${appTitle}`}>
          <meta charSet='utf-8' />
          {pageTitle && <title>{pageTitle}</title>}
          {description && <meta name="description" content={description} />}
        </Helmet>
      </>
    )
  }, [appTitle, pageTitle, description, meta])
}

export default MetaHead;