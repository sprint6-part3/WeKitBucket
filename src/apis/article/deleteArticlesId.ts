"use server";

import fetchInstance from "@/utils/fetchInstance";

const deleteArticlesId = async (articleId: number) => {
  try {
    await fetchInstance(`articles/${articleId}`, {
      method: "DELETE",
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Delete article failed");
    } else {
      throw new Error("Delete article failed");
    }
  }
};

export default deleteArticlesId;
