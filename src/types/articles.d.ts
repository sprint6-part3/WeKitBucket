export interface ArticleWriter {
  id: number;
  name: string;
}

export interface ArticleList {
  id: number;
  title: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
  writer: ArticleWriter;
  likeCount?: number;
}

export interface ArticleData {
  list: ArticleList[] | [];
  totalCount: number;
}

export interface IArticleProps {
  article: ArticleData;
}
