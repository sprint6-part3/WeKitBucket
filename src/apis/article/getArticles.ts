import { ArticleData } from "@/types/articles";
import fetchInstance from "@/utils/fetchInstance";

export interface ArticleOption {
  page?: number;
  pageSize?: number;
  orderBy?: "recent" | "like";
  keyword?: string;
}

const convertToRecord = (option: ArticleOption): Record<string, string> => {
  const record: Record<string, string> = {};
  Object.keys(option).forEach(key => {
    record[key] = String((option as never)[key]);
  });
  return record;
};

// 자유게시판 페이지
const getArticles = async (options: ArticleOption): Promise<ArticleData> => {
  const params = new URLSearchParams(convertToRecord(options)).toString();

  try {
    const data = await fetchInstance(`articles?${params}`, {
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
