"use server";

import fetchInstance from "@/utils/fetchInstance";

export interface IProfile {
  id?: number;
  code?: string;
}

export interface RequestUsersMe {
  id?: number;
  name?: string;
  teamId?: string;
  createdAt?: string;
  updatedAt?: string;
  profile?: IProfile;
}

const getUsersMe = async () => {
  try {
    const data = await fetchInstance<RequestUsersMe>("users/me", {
      method: "GET",
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Artist list failed");
    } else {
      throw new Error("Artist list failed");
    }
  }
};

export default getUsersMe;
