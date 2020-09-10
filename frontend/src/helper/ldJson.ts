import { SiteSettings } from '../types/siteSettings';

export const createLdJsonTypeWebSite = (siteSettings: SiteSettings | undefined) => {
  if (siteSettings) {
    return {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "url": siteSettings,
      "image": [siteSettings.mainImage],
      "publisher": {
        "@type": "Organization",
        "name": siteSettings.title,
        "logo": {
          "@type": "ImageObject",
          "url": siteSettings.logo,
        }
      }
    }
  }

}


export const createLdJsonData = () => {
  const appTitle = process.env.REACT_APP_TITLE;
  console.log(appTitle)
}