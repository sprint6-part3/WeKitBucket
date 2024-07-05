"use server";

import fetchInstance from "@/utils/fetchInstance";
import { ArticleDetail } from "./deleteArticlesLike";

const postArticlesLike = async (articleId: number) => {
  try {
    const data: ArticleDetail = await fetchInstance(`articles/${articleId}/like`, {
      method: "POST",
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to like");
    } else {
      throw new Error("Failed to like");
    }
  }
};

export default postArticlesLike;
