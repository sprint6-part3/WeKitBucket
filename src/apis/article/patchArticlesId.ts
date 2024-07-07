"use server";

import fetchInstance from "@/utils/fetchInstance";
import { ArticleInput } from "./postArticles";

const patchArticlesId = async (articleInput: ArticleInput, articleId: number) => {
  try {
    const { image, ...restInput } = articleInput;
    const body = image ? articleInput : restInput;

    await fetchInstance(`articles/${articleId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Patch article failed");
    } else {
      throw new Error("Patch article failed");
    }
  }
};

export default patchArticlesId;
