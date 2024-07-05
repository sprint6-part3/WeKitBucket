"use server";

import fetchInstance from "@/utils/fetchInstance";
import { RequestProfileCode } from "./getProfilesCode";

export type ImageType = string | null;

export interface PatchProfileOption {
  securityAnswer?: string;
  securityQuestion?: string;
  nationality: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: string | File | ImageType;
  content: string;
}

const patchProfilesCode = async (profileCode: string | undefined, options: PatchProfileOption) => {
  try {
    const data = await fetchInstance<RequestProfileCode>(`profiles/${profileCode}`, {
      method: "PATCH",
      body: JSON.stringify(options),
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Patch profile failed");
    } else {
      throw new Error("Patch profile failed");
    }
  }
};

export default patchProfilesCode;
