import {
    BreadcrumbList, CreateJsonLdTypeBlogPostingArg, CreateJsonLdTypeWebSiteArg
} from '../types/jsonLd';
import { InitState } from '../types/mainContext';

export const createJsonLdTypeWebSite = ({ init }: CreateJsonLdTypeWebSiteArg) => {
  if (init) {
    return {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "url": init.url,
      "image": init.siteSettings.main_image,
      "publisher": createPublisher(init),
    }
  }
}

export const createJsonLdTypeBlogPosting = ({ init, post }: CreateJsonLdTypeBlogPostingArg) => {
  if (init) {
    const BlogPosting = {
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      "datePublished": post.created_at,
      "dateModified": post.updated_at,
      "headline": post.title,
      "description": post.plain_content,
      "image": post.cover_media.cover,
      "author": {
        "@type": "Person",
        "name": init?.author.public_name,
        "url": init.url,
      },
      "publisher": createPublisher(init),
    }
    const breadcrumbList = createJsonLdTypeBreadcrumbList([
      {
        "position": 1,
        "@type": 'ListItem',
        "item": {
          "@type": 'Thing',
          "id": `${init.url}/categories/${post.category.slug}`,
          "name": post.category.name,
        }
      },
    ])
    return [BlogPosting, breadcrumbList]
  }
}

export const createJsonLdTypeBreadcrumbList = (list: BreadcrumbList) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": list
  }
}

const createPublisher = (init: InitState) => {
  return {
    "@type": "Organization",
    "name": init.siteSettings.name,
    "logo": {
      "@type": "ImageObject",
      "url": init.siteSettings.logo,
    }
  }
}
