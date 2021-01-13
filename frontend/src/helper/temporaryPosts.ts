
import { PostDetail } from '../types/posts';

export const makeTemporaryPostList = (n: Number = 5): PostDetail[] => {
  const result: PostDetail[] = [];
  for (let i = 1; i <= n; i++) {
    result.push({
      id: i,
      title: "",
      plain_content: "",
      slug: "",
      content: "",
      category: {
        id: 1,
        name: "",
        slug: "",
      },
      tag: [],
      cover_media: {
        id: 1,
        cover: undefined,
        cover_mini: undefined
      }
    })
  }
  return result;
}