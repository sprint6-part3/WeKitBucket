import { ArticleData } from "@/types/articles.type";
import fetchInstance from "@/utils/fetchInstance";

const getArticles = async (options?: {
  page?: number;
  pageSize?: number;
  orderBy?: "recent" | "like";
  keyword?: string;
}) => {
  try {
    const data = await fetchInstance<ArticleData>("articles", {
      method: "GET",
      params: options,
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Article list failed");
    } else {
      throw new Error("Article list failed");
    }
  }
};

export default getArticles;
