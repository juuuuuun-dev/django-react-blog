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

export const createLdJsonTypeBlogPosting = ({ init, post }: CreateLdJsonTypeBlogPostingArg) => {
  if (init) {
    return {
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
  }
}


export const createDlJsonTypeBreadcrumbList = () => {

}

export const createLdJsonData = () => {
  const appTitle = process.env.REACT_APP_TITLE;
  console.log(appTitle)
}