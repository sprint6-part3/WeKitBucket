"use server";

import fetchInstance from "@/utils/fetchInstance";

export interface ProfilesInput {
  securityAnswer?: string;
  securityQuestion: string;
}

const patchComment = async (commentId: number, content: string) => {
  try {
    await fetchInstance(`comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify({ content }),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "patch Comment failed");
    } else {
      throw new Error("patch Comment failed");
    }
  }
};

export default patchComment;
