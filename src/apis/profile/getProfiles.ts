import { ProfileData } from "@/types/profiles";
import fetchInstance from "@/utils/fetchInstance";
// 목록 페이지
const getProfiles = async (options: { page?: number; pageSize?: number; name?: string }): Promise<ProfileData> => {
  try {
    const data = await fetchInstance(`profiles?${options}`, {
      method: "GET",
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
