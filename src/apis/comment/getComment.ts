import fetchInstance from "@/utils/fetchInstance";

export interface ICommentList {
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
  writer: {
    id: number;
    image: null | string;
    name: string;
  };
}

export interface RequestComment {
  list: ICommentList[];
  nextCursor?: null | string;
}

const getComment = async (options?: { articleId: number; limit: number; cursor?: number }) => {
  try {
    const data = await fetchInstance<RequestComment>(`articles/${options?.articleId}/comments`, {
      method: "GET",
      params: options,
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
