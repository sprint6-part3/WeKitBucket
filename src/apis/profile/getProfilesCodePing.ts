import fetchInstance from "@/utils/fetchInstance";

interface PingRequest {
  registeredAt: string;
  userId: number;
}

const getProfilesCodePing = async (profileCode: string) => {
  try {
    const data = await fetchInstance<PingRequest>(`profiles/${profileCode}/ping`, {
      method: "PATCH",
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

export default getProfilesCodePing;
