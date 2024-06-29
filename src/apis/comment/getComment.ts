import fetchInstance from "@/utils/fetchInstance";
// 얘 문제 존나 많음 고쳐야함
interface RequestComment {
  list: unknown[];
  nextCursor?: null | string;
}
const getComment = async (
  articleId: number,
  options: {
    limit: number;
    nextCursor?: number;
  },
) => {
  try {
    const data = await fetchInstance<RequestComment>(`articles/${articleId}?${options}`, {
      method: "GET",
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Comment list failed");
    } else {
      throw new Error("Comment list failed");
    }
  }
};

export default getComment;
