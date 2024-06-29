"use server";

import fetchInstance from "@/utils/fetchInstance";
import { ProfilesInput } from "./postProfiles";
// const profileCode = "3f5cdb96-a6df-4ae3-bca7-95f2bc7876e2"
// await postProfilesCodePing(profileCode, { securityAnswer: "string" }); <= 일케 넣으면되요

const postProfilesCodePing = async (profileCode: string, securityAnswer: ProfilesInput) => {
  try {
    const data = await fetchInstance<ProfilesInput>(`profiles/${profileCode}/ping`, {
      method: "POST",
      body: JSON.stringify({ securityAnswer }),
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
