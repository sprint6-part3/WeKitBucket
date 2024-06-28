"use server";

import fetchInstance from "@/utils/fetchInstance";
import { UserInput } from "@/types/auth";
import { cookies } from "next/headers";

export interface Profile {
  id?: number;
  code?: string;
}
export interface User {
  id?: number;
  name?: string;
  teamId?: string;
  createdAt?: string;
  updatedAt?: string;
  profile?: Profile;
  email?: string;
}

export interface RequestUserInfo {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
}

const postSignIn = async (userInput: UserInput) => {
  try {
    const data = await fetchInstance<RequestUserInfo>("auth/signIn", {
      method: "POST",
      body: JSON.stringify(userInput),
    });

    if (data.accessToken) {
      cookies().set("cookie", data.accessToken);
    } else {
      throw new Error("Access token is missing");
    }

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
