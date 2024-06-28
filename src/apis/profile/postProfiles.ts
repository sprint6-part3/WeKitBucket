"use server";

import fetchInstance from "@/utils/fetchInstance";

export interface ProfilesInput {
  securityAnswer?: string;
  securityQuestion: string;
}

const postProfiles = async (profilesInput: ProfilesInput) => {
  try {
    await fetchInstance("profiles", {
      method: "POST",
      body: JSON.stringify(profilesInput),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "profile changing failed");
    } else {
      throw new Error("profile changing failed");
    }
  }
};

export default postProfiles;
