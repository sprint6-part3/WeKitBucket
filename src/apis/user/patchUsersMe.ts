"use server";

import fetchInstance from "@/utils/fetchInstance";

export interface ChangePasswordInput {
  passwordConfirmation?: string;
  password?: string;
  currentPassword?: string;
}

const patchUsersMe = async (changePasswordInput: ChangePasswordInput) => {
  try {
    await fetchInstance("users/me/password", {
      method: "PATCH",
      body: JSON.stringify(changePasswordInput),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Patch password failed");
    } else {
      throw new Error("patch password failed");
    }
  }
};

export default patchUsersMe;
