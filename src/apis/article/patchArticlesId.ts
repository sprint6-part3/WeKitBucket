"use server";

import fetchInstance from "@/utils/fetchInstance";

export interface ArticleInput {
  image?: string;
  content: string;
  title: string;
}

const patchArticlesId = async (articleInput: ArticleInput, articleId: number) => {
  try {
    await fetchInstance(`articles/${articleId}`, {
      method: "PATCH",
      body: JSON.stringify(articleInput),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Patch article failed");
    } else {
      throw new Error("patch article failed");
    }
  }
};

export default patchArticlesId;
