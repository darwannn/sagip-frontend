import { User } from "./user";
export type Article = {
  _id: string;
  userId: string;
  title: string;
  content: string;
  image: string;
  category: string;
  views: number;
  saves: string[];
  status: string;
  authorId: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ArticleState = {
  articles: Article[];
};

export type TArticleResData = {
  safetyTip: Article;
  message: string;
  success: boolean;
  image?: string;
  title?: string;
  contents?: string;
};

export const ArticleTypes = [
  "General Tips",
  "Preparedness",
  "Flood Safety",
  "Heat Safety",
];
