"use server";

import fetchInstance from "@/utils/fetchInstance";

export interface ArticleInput {
  image?: string;
  content: string;
  title: string;
}

const postArticles = async (articleInput: ArticleInput) => {
  try {
    await fetchInstance("articles", {
      method: "POST",
      body: JSON.stringify(articleInput),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "post article failed");
    } else {
      throw new Error("post article failed");
    }
  }
};

export default postArticles;
