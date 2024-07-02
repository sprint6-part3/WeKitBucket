"use server";

import fetchInstance from "@/utils/fetchInstance";

export interface ProfilesInput {
  securityAnswer?: string;
  securityQuestion: string;
}

const postComment = async (articleId: number, content: string) => {
  try {
    await fetchInstance(`articles/${articleId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "post Comment failed");
    } else {
      throw new Error("post Comment failed");
    }
  }
};

export default postComment;
