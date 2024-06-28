"use server";

import { ArticleData } from "@/types/articles";
import fetchInstance from "@/utils/fetchInstance";

// 자유게시판 페이지
const getArticles = async (options: {
  page?: number;
  pageSize?: number;
  orderBy?: "recent" | "like";
  keyword?: string;
}) => {
  try {
    const data = await fetchInstance<ArticleData>(`articles?${options}`, {
      method: "GET",
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Artist list failed");
    } else {
      throw new Error("Artist list failed");
    }
  }
};

export default getArticles;
