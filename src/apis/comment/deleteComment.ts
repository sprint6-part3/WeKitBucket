"use server";

import fetchInstance from "@/utils/fetchInstance";

const deleteComment = async (commentId: number) => {
  try {
    await fetchInstance(`comments/${commentId}`, {
      method: "DELETE",
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Delete notifications failed");
    } else {
      throw new Error("Delete notifications failed");
    }
  }
};

export default deleteComment;
