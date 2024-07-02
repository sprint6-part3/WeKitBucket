"use client";

import React from "react";
import { IArticleProps } from "@/types/articles";
import BestPostCard from "./BestPostCard";

function BestFlex({ article }: IArticleProps) {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-[60px] py-[40px]">
      <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-4 lg:px-[6px]">
        {article?.list?.map(post => <BestPostCard key={post.id} post={post} />)}
      </ul>
    </div>
  );
}

export default BestFlex;
