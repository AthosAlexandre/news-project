export type News = {
  id: number;
  title: string;
  summary: string;
  body: string;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  published: boolean;
};