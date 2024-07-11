"use client";

import useWindowSize from "@/hooks/useWindowSize";
import { IArticleProps } from "@/types/articles.type";
import BestSwiper from "./BestSwiper";
import BestFlex from "./BestFlex";

function BestPostList({ article }: IArticleProps) {
  const windowSize = useWindowSize();
  const isMobile = windowSize < 640 && windowSize !== 0;

  return (
    <div className="w-full overflow-hidden">
      {isMobile ? <BestSwiper article={article} /> : <BestFlex article={article} />}
    </div>
  );
}

export default BestPostList;
