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
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ArticleState = {
  articles: Article[];
};

export const ArticleTypes = [
  "General Tips",
  "Preparedness",
  "Flood Safety",
  "Heat Safety",
];
