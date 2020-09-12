import { InitState } from '../types/mainContext';
import { PostDetail } from '../types/posts';

type CreateLdJsonTypeWebSiteArg = {
  init: InitState | undefined;
}

export type CreateLdJsonTypeBlogPostingArg = {
  init: InitState | undefined,
  post: PostDetail,
}



export const createLdJsonTypeWebSite = ({ init }: CreateLdJsonTypeWebSiteArg) => {
  if (init) {
    return {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "url": init.url,
      "image": [init.siteSettings.mainImage],
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
        item: `${init.url}/${post.category.slug}`
      },
    ])
    return [BlogPosting, breadcrumbList]
  }
}

type BreadcrumbList = {
  position: number,
  name: string,
  item: string,
}[]

export const createLdJsonTypeBreadcrumbList = (list: BreadcrumbList) => {
  console.log({ list })
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": list
  }
}

export const createPostBreadcrumbList = ({ init, post }: CreateLdJsonTypeBlogPostingArg) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Books",
        "item": "https://example.com/books"
      }
    ]
  }
}

export const createLdJsonData = () => {
  const appTitle = process.env.REACT_APP_TITLE;
  console.log(appTitle)
}


const createPublisher = (init: InitState) => {
  return {
    "@type": "Organization",
    "name": init.siteSettings.title,
    "logo": {
      "@type": "ImageObject",
      "url": init.siteSettings.logo,
    }
  }
}
