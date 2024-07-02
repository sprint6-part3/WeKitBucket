"use server";

import fetchInstance from "@/utils/fetchInstance";

const deleteArticlesLike = async (articleId: number) => {
  try {
    await fetchInstance(`articles/${articleId}/like`, {
      method: "DELETE",
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to hate");
    } else {
      throw new Error("Failed to hate");
    }
  }
};

export default deleteArticlesLike;
