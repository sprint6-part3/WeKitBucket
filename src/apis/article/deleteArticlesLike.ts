"use server";

import fetchInstance from "@/utils/fetchInstance";

export interface ArticleDetail {
  content: string;
  createdAt: string;
  id: number;
  image?: string;
  isLiked: boolean;
  likeCount?: number;
  title: string;
  updatedAt?: string;
  writer: {
    id: number;
    name: string;
  };
}

const deleteArticlesLike = async (articleId: number) => {
  try {
    const data: ArticleDetail = await fetchInstance(`articles/${articleId}/like`, {
      method: "DELETE",
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to hate");
    } else {
      throw new Error("Failed to hate");
    }
  }
};

export default deleteArticlesLike;
