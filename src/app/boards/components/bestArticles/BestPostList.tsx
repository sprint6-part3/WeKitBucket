"use client";

import useWindowSize from "@/hooks/useWindowSize";
import React from "react";
import { ArticleList } from "@/types/articles";
// eslint-disable-next-line import/no-cycle
import BestSwiper from "./BestSwiper";
// eslint-disable-next-line import/no-cycle
import BestFlex from "./BestFlex";

export interface IBestPostListProps {
  article: ArticleList[] | [];
}

function BestPostList({ article }: IBestPostListProps) {
  const windowSize = useWindowSize();
  const isMobile = windowSize < 640 && windowSize !== 0;

  return (
    <div className="w-full overflow-hidden">
      {isMobile ? <BestSwiper article={article} /> : <BestFlex article={article} />}
    </div>
  );
}

export default BestPostList;
