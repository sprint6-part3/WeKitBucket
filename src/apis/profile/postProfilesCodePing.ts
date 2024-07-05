"use server";

import fetchInstance from "@/utils/fetchInstance";
import { ProfilesInput } from "./postProfiles";

const postProfilesCodePing = async (profileCode: string | undefined, securityAnswer: ProfilesInput) => {
  try {
    const data = await fetchInstance<ProfilesInput>(`profiles/${profileCode}/ping`, {
      method: "POST",
      body: JSON.stringify(securityAnswer),
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Ping failed");
    } else {
      throw new Error("Ping failed");
    }
  }
};

export default postProfilesCodePing;
