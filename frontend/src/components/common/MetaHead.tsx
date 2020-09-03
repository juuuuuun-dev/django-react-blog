import React from 'react';
import { Helmet } from 'react-helmet';
import { helmetJsonLdProp } from 'react-schemaorg';
import { BlogPosting, Person } from 'schema-dts';

import { MetaHeadProps } from '../../types/meta';

const MetaHead: React.FC<MetaHeadProps> = ({ pageTitle, description, meta }) => {
  const appTitle = process.env.REACT_APP_TITLE;
  // https://developers.google.com/search/docs/data-types/breadcrumb?hl=ja
  // https://search.google.com/test/rich-results?utm_campaign=sdtt&utm_medium=message

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
            "@graph":
              [
                // 記事
                {
                  "@context": "http://schema.org",
                  "@type": "BlogPosting",
                  "datePublished": "2015-02-05T08:00:00+08:00",
                  "dateModified": "2015-02-05T09:20:00+08:00",
                  "author": {
                    "@type": "Person",
                    "name": "junkata",
                    "url": "http://",
                    "sameAs": [
                      "https://twitter.com/junkata#######"
                    ]
                  },
                },
                // パンくず
                {
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  "itemListElement": [{
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Books",
                    "item": "https://example.com/books"
                  }, {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Science Fiction",
                    "item": "https://example.com/books/sciencefiction"
                  }, {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Award Winners"
                  }]
                },
                // logo
                {
                  "@context": "http://schema.org",
                  "@type": "Organization",
                  "url": "http://example.com",
                  "logo": "example.com/1024.png"
                },
              ]
          })}</script>
          {pageTitle && <title>{pageTitle}</title>}
          {description && <meta name="description" content={description} />}
        </Helmet>
      </>
    )
  }, [appTitle, pageTitle, description, meta])
}

export default MetaHead;