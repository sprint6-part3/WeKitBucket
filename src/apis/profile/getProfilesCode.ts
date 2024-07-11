import fetchInstance from "@/utils/fetchInstance";

export interface RequestProfileCode {
  id: number;
  code: string;
  image: null;
  city: string;
  mbti: string;
  job: string;
  sns: string;
  birthday: string;
  nickname: string;
  bloodType: string;
  family: string;
  nationality: string;
  content: string;
  teamId: string;
  securityQuestion: string;
  updatedAt: string;
  name: string;
}

const getProfilesCode = async (profileCode: string) => {
  try {
    const data = await fetchInstance<RequestProfileCode>(`profiles/${profileCode}`, {
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

export default getProfilesCode;
