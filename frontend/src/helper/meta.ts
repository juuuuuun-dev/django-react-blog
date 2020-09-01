import { MetaData } from '../types/meta';

export const createMeta = (data: MetaData) => {
  const result = [];
  result.push(createOgp(data));
  return result;
}

const createOgp = (data: MetaData) => {
  return [
    { property: 'og:url', content: data.url },
    { property: 'og:title', content: data.title },
    { property: 'og:description', content: data.description },
    { property: 'og:type', content: data.type },
    { property: 'og:image', content: data.image },
  ]
}