"use client";

import React from "react";
import BestPostCard from "./BestPostCard";

function BestFlex() {
  const slides = Array.from({ length: 4 });

  return (
    <div className="mx-auto w-full max-w-[1180px] px-[60px] py-[40px]">
      <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-4 lg:px-[6px]">
        {slides.map(() => (
          <BestPostCard />
        ))}
      </ul>
    </div>
  );
}

export default BestFlex;
