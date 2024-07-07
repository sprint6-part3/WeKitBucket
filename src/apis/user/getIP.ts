import { ipInfo } from "@/types/user.type";

const getIP = async (): Promise<ipInfo | null> => {
  try {
    const data = await fetch("http://ip-api.com/json")
      .then(res => res.json())
      .then(f => f);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Artist list failed");
    } else {
      throw new Error("Artist list failed");
    }
  }
};

export default getIP;
