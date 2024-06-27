"use client";

import useWindowSize from "@/hooks/useWindowSize";
import React from "react";
import BestSwiper from "./BestSwiper";
import BestFlex from "./BestFlex";

function BestPostList() {
  const windowSize = useWindowSize();
  const isMobile = windowSize < 640 && windowSize !== 0;

  return <div className="w-full overflow-hidden">{isMobile ? <BestSwiper /> : <BestFlex />}</div>;
}

export default BestPostList;
