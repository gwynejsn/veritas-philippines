import rawData from './newsData.json';

export interface Article {
  id: string;
  slug: string;
  category: 'Politics' | 'Economy' | 'Health' | 'Lifestyle' | 'Tech' | 'Opinion';
  author: string;
  isVerified: boolean;
  date: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
}

export const newsData = rawData as Article[];
