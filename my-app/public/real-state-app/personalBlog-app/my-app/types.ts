export type Comment = {
  name: string;
  text: string;
  date: string;
};
export type CatWithImage={
  name:string
  image:string
}
export type Post = {
  id: number;
  title: string;
  longDescription: string;
  slug: string;
  categories: string;
  tags: string[];
  author: string;
  date: string;
  readTime: string;
  thumbnail: string;
  summary: string;
  isFeatured: boolean;
  likes: number;
  comments: Comment[];
  relatedPosts: number[];
};
