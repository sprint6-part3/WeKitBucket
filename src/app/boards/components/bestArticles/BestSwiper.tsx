"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import BestPostCard from "./BestPostCard";
// eslint-disable-next-line import/no-cycle
import { IBestPostListProps } from "./BestPostList";

function BestSwiper({ article }: IBestPostListProps) {
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
      {article?.map(post => (
        <SwiperSlide key={post.id} style={{ width: "auto" }} className="py-5">
          <BestPostCard post={post} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default BestSwiper;
