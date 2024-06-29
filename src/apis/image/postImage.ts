"use server";

import fetchInstance from "@/utils/fetchInstance";

const postImage = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const data = await fetchInstance<string>("auth/signIn", {
      method: "POST",
      body: formData,
      headers: {},
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
