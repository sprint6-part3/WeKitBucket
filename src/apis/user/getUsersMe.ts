"use server";

import { IUser } from "@/types/user.type";
import fetchInstance from "@/utils/fetchInstance";
import { cookies } from "next/headers";

const getUsersMe = async () => {
  try {
    if (cookies().get("accessToken")) {
      const data = await fetchInstance<IUser>("users/me", {
        method: "GET",
      });
      return data;
    }

    return null;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message || "Artist list failed");
    } else {
      throw new Error("Artist list failed");
    }
  }
};

export default getUsersMe;
