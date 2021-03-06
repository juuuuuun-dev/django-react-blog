import { CategoryDetail } from './categories';
import { PostDetail } from './posts';
import { ProfileDetail } from './profile';
import { TagDetail } from './tags';

export type CategoryLinkListProps = {
  categories: { [key: string]: CategoryDetail } | undefined
}

export type TagLinkListProps = {
  tags: TagDetail[] | undefined;
}

export type RecentPostListProps = {
  posts: PostDetail[] | undefined;
}


export type RightContentsSectionProps = {
  children: ReactNode;
  title: string;
}

export type AboutMeProps = {
  author: ProfileDetail | undefined;
}