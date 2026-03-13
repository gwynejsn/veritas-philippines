export interface Comment {
  id: string;
  articleSlug: string;
  user: string;
  text: string;
  time: string;
  likes: number;
  replies?: Comment[];
}
