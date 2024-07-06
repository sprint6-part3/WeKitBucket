"use server";

import fetchInstance from "@/utils/fetchInstance";
import { UserInput } from "@/types/auth.type";
import { RequestUserInfo } from "./postSignIn";

const postSignUp = async (userInput: UserInput) => {
  try {
    const data = await fetchInstance<RequestUserInfo>("auth/signUp", {
      method: "POST",
      body: JSON.stringify(userInput),
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "sign up failed");
    } else {
      throw new Error("sign up failed");
    }
  }
};

export default postSignUp;
