import React from 'react';
import { Helmet } from 'react-helmet';
import { helmetJsonLdProp } from 'react-schemaorg';

import { MetaHeadProps } from '../../types/meta';

const MetaHead: React.FC<MetaHeadProps> = ({ appTitle, pageTitle, meta, ldJson }) => {
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
            "@graph": ldJson,
            // [
            //   // 記事以外のページ web site これ反映されないけどいるの？
            //   {
            //     "@context": "http://schema.org",
            //     "@type": "WebSite",
            //     "url": "blog.junkata.com",
            //     //適切な画像が選択されるようにするために、アスペクト比が 16x9、4x3、1x1 の高解像度画像（幅と高さをかけて 800,000 ピクセル以上の画像）を複数指定してください。
            //     // OGP 1200 * 630だからこれで間に合わせる
            //     "image": [
            //       '16*9.jpg',
            //     ],
            //     "publisher": { // 共通
            //       "@type": "Organization",
            //       "name": "junkata.com",
            //       "url": "https://junkata.com",
            //       // logo ロゴは 60x600 ピクセルの長方形に収まるようにし、高さを 60 ピクセルちょうどにするか（推奨）、または幅を 600 ピクセルちょうどにする必要があります。たとえば、450x45 ピクセルは、600x60 ピクセルの長方形に収まりますが、許容されません。
            //       "logo": {
            //         "@type": "ImageObject",
            //         "url": "http://example.com/1024.png", //  H60 x W600
            //       },
            //     }
            //   },
            //   // 記事 記事ページはこれ
            //   {
            //     "@context": "http://schema.org",
            //     "@type": "BlogPosting",
            //     "datePublished": "2015-02-05T08:00:00+08:00",
            //     "dateModified": "2015-02-05T09:20:00+08:00",
            //     "headline": "見出しは半角 110 文字（全角 55 文字）", //見出しは半角 110 文字（全角 55 文字）
            //     "description": "des",
            //     "aho": "aho",
            //     "image": [
            //       "http://example.com/1024.png",
            //     ],
            //     "author": {
            //       "@type": "Person",
            //       "name": "junkata",
            //       "url": "https://www.junkata.com",
            //       "sameAs": [ // その他url
            //         "https://twitter.com/junkata#######",
            //       ]
            //     },
            //     "publisher": {
            //       "@type": "Organization",
            //       "name": "junkata.com",
            //       "url": "https://junkata.com",
            //       // logo ロゴは 60x600 ピクセルの長方形に収まるようにし、高さを 60 ピクセルちょうどにするか（推奨）、または幅を 600 ピクセルちょうどにする必要があります。たとえば、450x45 ピクセルは、600x60 ピクセルの長方形に収まりますが、許容されません。
            //       "logo": {
            //         "@type": "ImageObject",
            //         "url": "http://example.com/1024.png", //  H60 x W600
            //       },
            //     }
            //   },
            //   // パンくず 一つ目はhomeではない。homeはいらない
            //   {
            //     "@context": "https://schema.org",
            //     "@type": "BreadcrumbList",
            //     "itemListElement": [{
            //       "@type": "ListItem",
            //       "position": 1,
            //       "name": "Books",
            //       "item": "https://example.com/books"
            //     }, {
            //       "@type": "ListItem",
            //       "position": 2,
            //       "name": "Science Fiction",
            //       "item": "https://example.com/books/sciencefiction"
            //     }, {
            //       "@type": "ListItem",
            //       "position": 3,
            //       "name": "Award Winners"
            //     }]
            //   },
            // ]
          })}</script>
          {pageTitle && <title>{pageTitle}</title>}
        </Helmet>
      </>
    )
  }, [appTitle, pageTitle, meta, ldJson])
}

export default MetaHead;