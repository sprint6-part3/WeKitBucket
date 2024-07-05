"use client";

import fetchInstance from "@/utils/fetchInstance";

interface PostImageResponse {
  url: string;
}

const postImage = async (image: File): Promise<PostImageResponse> => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const data: PostImageResponse = await fetchInstance<PostImageResponse>("images/upload", {
      method: "POST",
      body: formData,
      isMultipart: true,
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Image upload failed");
    } else {
      throw new Error("Image upload failed");
    }
  }
};

export default postImage;
