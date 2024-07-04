import { ProfileData } from "@/types/profiles";
import fetchInstance from "@/utils/fetchInstance";

const getProfiles = async ({ page = 1, pageSize = 3, name = "" }: ProfilesOption) => {
  try {
    const data = await fetchInstance<ProfileData>("profiles", {
      method: "GET",
      params: { page, pageSize, name },
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "profile list failed");
    } else {
      throw new Error("profile list failed");
    }
  }
};

export default getProfiles;
