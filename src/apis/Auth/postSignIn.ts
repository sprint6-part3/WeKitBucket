import fetchInstance from "@/utils/fetchInstance";
import { UserInput } from "@/types/auth";

const postSignIn = async (userInput: UserInput) => {
  try {
    const data = await fetchInstance("auth/signIn", {
      method: "POST",
      body: JSON.stringify(userInput),
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "login failed");
    } else {
      throw new Error("login failed");
    }
  }
};

export default postSignIn;
