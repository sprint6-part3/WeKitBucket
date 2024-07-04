"use client";

import postArticles from "@/apis/article/postArticles";
import { useEffect } from "react";

function page() {
  const data = {
    image: "https://example.com/",
    content: "게시글 내용adfd입니다.",
    title: "게시글 제목입adf니다.",
  };
  useEffect(() => {
    const load = async () => {
      await postArticles(data);
    };
    load();
  });

  return (
    <div>
      <div>test</div>
      {/* <Button /> */}
    </div>
  );
}

export default page;
