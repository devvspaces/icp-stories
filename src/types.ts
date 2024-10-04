import { Principal, StableBTreeMap } from "azle";

/**
  This type represents a member on the platform
*/
export class Member {
  id: string;
  username: string;
  name: string;
  tagline?: string | null;
  bio?: string | null;
  image?: string | null;
  genres?: string[];
  createdAt: Date;
  updatedAt?: Date | null;
  blogs: string[];
}

/**
  This type represents a blog a user can own
  A blog contains articles and series
*/
export class Blog {
  id: string;
  userId: string;
  name: string;
  about: string;
  socials: Record<string, string>;
  series: string[];
  posts: string[];
  createdAt: Date;
  updatedAt: Date | null;
}

/**
  This type represents a series of articles
*/
export enum SeriesSorting {
  OLDEST_FIRST = "oldest_first",
  NEWEST_FIRST = "newest_first",
}
export class Series {
  id: string;
  name: string;
  userId: string;
  blogId: string;
  description: string;
  cover_image?: string | null;
  genres?: string[];
  sorting: SeriesSorting;
  posts: string[];
  createdAt: Date;
  updatedAt?: Date | null;
}

/**
  This type represents a comment
*/
export class Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}

/**
  This type represents a post
*/
export enum PostStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}
export class Post {
  id: string;
  userId: string;
  blogId: string;
  seriesId?: string | null;
  status: PostStatus;
  title: string;
  slug: string;
  subtitle?: string | null;
  content: string;
  genres?: string[];
  cover_image?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  canonical_url?: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  comment_enabled: boolean;
}
