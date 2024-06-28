"use server";

import fetchInstance from "@/utils/fetchInstance";
// 시간관계상 이미지 등록 페이지 생기면 이어서 하겠습니다..
const postImage = async (image: string) => {
  try {
    const data = await fetchInstance<string>("auth/signIn", {
      method: "POST",
      body: JSON.stringify(image),
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "image add failed");
    } else {
      throw new Error("image add failed");
    }
  }
};

export default postImage;
