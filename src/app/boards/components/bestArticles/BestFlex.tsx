"use client";

import React from "react";
import BestPostCard from "./BestPostCard";
// eslint-disable-next-line import/no-cycle
import { IBestPostListProps } from "./BestPostList";

function BestFlex({ article }: IBestPostListProps) {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-[60px] py-[40px]">
      <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-4 lg:px-[6px]">
        {article.map(post => (
          <BestPostCard key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

export default BestFlex;
