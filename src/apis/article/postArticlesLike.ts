"use server";

import fetchInstance from "@/utils/fetchInstance";

const postArticlesLike = async (articleId: number) => {
  try {
    await fetchInstance(`articles/${articleId}/like`, {
      method: "POST",
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to like");
    } else {
      throw new Error("Failed to like");
    }
  }
};

export default postArticlesLike;
