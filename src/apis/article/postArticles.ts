import fetchInstance from "@/utils/fetchInstance";
import { UserInput } from "@/types/auth";
import { cookies } from "next/headers";

const postArticles = async (userInput: UserInput) => {
  try {
    const data = await fetchInstance("auth/signUp", {
      method: "POST",
      body: JSON.stringify(userInput),
    });
    cookies().set("cookie", data.accessToken);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "sign up failed");
    } else {
      throw new Error("sign up failed");
    }
  }
};

export default postArticles;
