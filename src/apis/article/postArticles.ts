"use server";

import fetchInstance from "@/utils/fetchInstance";

export interface ArticleInput {
  image?: string;
  content: string;
  title: string;
}

interface PostArticlesResponse {
  id: string;
}

const postArticles = async (
  articleInput: ArticleInput = { image: "https://example.com/", content: "headers", title: "fd" },
): Promise<PostArticlesResponse> => {
  try {
    const response = await fetchInstance<PostArticlesResponse>("articles", {
      method: "POST",
      body: JSON.stringify(articleInput),
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "post article failed");
    } else {
      throw new Error("post article failed");
    }
  }
};

export default postArticles;
