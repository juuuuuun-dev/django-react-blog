import { CategoryDetail } from './categories';
import { PostDetail } from './posts';
import { TagDetail } from './tags';

export type CategoryLinkListProps = {
  categories: CategoryDetail[] | undefined
}

export type TagLinkListProps = {
  tags: TagDetail[] | undefined
}

export type RecentPostListProps = {
  posts: PostDetail[] | undefined
}


export type RightContentsSectionProps = {
  children: ReactNode;
  title: string;
}