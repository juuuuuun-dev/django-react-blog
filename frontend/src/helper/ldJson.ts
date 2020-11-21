import {
    BreadcrumbList, CreateLdJsonTypeBlogPostingArg, CreateLdJsonTypeWebSiteArg
} from '../types/ldJson';
import { InitState } from '../types/mainContext';

export const createLdJsonTypeWebSite = ({ init }: CreateLdJsonTypeWebSiteArg) => {
  if (init) {
    return {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "url": init.url,
      "image": [init.siteSettings.main_image],
      "publisher": createPublisher(init),
    }
  }
}

export const createLdJsonTypeBlogPosting = ({ init, post }: CreateLdJsonTypeBlogPostingArg) => {
  if (init) {
    const BlogPosting = {
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      "datePublished": post.created_at,
      "dateModified": post.updated_at,
      "headline": post.title,
      "description": post.plain_content,
      "image": [post.cover_media],
      "author": {
        "@type": "Person",
        "name": init?.author.public_name,
        "url": init.url,
      },
      "publisher": createPublisher(init),
    }
    const breadcrumbList = createLdJsonTypeBreadcrumbList([
      {
        position: 1,
        name: post.category.name,
        item: `${init.url}/categories/${post.category.slug}`
      },
    ])
    return [BlogPosting, breadcrumbList]
  }
}

export const createLdJsonTypeBreadcrumbList = (list: BreadcrumbList) => {
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
