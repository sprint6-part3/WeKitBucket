"use client";

import useWindowSize from "@/hooks/useWindowSize";
import React, { useEffect, useState } from "react";
import getArticles from "@/apis/article/getArticles";
import { IArticleProps } from "@/types/articles";
import BestSwiper from "./BestSwiper";
import BestFlex from "./BestFlex";

function BestPostList({ article }: IArticleProps) {
  const windowSize = useWindowSize();
  const isMobile = windowSize < 640 && windowSize !== 0;
  const [articles, setArticles] = useState(article);

  useEffect(() => {
    const getArticlesWithOptions = async () => {
      try {
        const res = await getArticles({
          pageSize: 4,
          orderBy: "like",
        });
        setArticles(res);
      } catch (error) {
        console.error("Failed to fetch getArticles: ", error);
      }
    };

    getArticlesWithOptions();
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {isMobile ? <BestSwiper article={articles} /> : <BestFlex article={articles} />}
    </div>
  );
}

export default BestPostList;
