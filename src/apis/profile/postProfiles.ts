import fetchInstance from "@/utils/fetchInstance";

export interface ProfilesInput {
  securityAnswer: string;
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
      throw new Error(error.message || "프로필 수정 failed");
    } else {
      throw new Error("프로필 수정 failed");
    }
  }
};

export default postProfiles;
