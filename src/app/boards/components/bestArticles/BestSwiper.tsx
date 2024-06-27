"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import BestPostCard from "./BestPostCard";

function BestSwiper() {
  const slides = Array.from({ length: 4 });

  return (
    <Swiper
      spaceBetween={16}
      slidesPerView="auto"
      loop
      observeParents
      observer
      observeSlideChildren
      className="w-full max-w-[1240px] !pl-5 sm:!px-5"
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={String(idx + 1)} style={{ width: "auto" }} className="py-5">
          <BestPostCard />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default BestSwiper;
