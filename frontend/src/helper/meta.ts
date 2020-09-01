import { CreateMetaArg, MetaType } from '../types/meta';

export const createMeta = (data: CreateMetaArg) => {
  data.type = data.type || 'article';
  data.image = data.image || '/assets/images/ogp-image.jpg';
  return [...createOgpMeta(data), ...createTwitterMeta(data)]
}

const createOgpMeta = (data: CreateMetaArg) => {
  return [
    { property: 'og:url', content: data.url },
    { property: 'og:title', content: data.title },
    { property: 'og:description', content: data.description },
    { property: 'og:type', content: data.type },
    { property: 'og:image', content: data.image },
  ]
}

const createTwitterMeta = (data: CreateMetaArg) => {
  return [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: data.title },
    { name: 'twitter:url', content: data.url },
    { name: 'twitter:description', content: data.description },
    { name: 'twitter:image', content: data.image },
  ]
}

