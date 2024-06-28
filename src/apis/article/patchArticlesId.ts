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
      throw new Error(error.message || "post article failed");
    } else {
      throw new Error("post article failed");
    }
  }
};

export default patchArticlesId;
