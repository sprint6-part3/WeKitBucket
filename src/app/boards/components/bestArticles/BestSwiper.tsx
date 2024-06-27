import React, { PropsWithChildren } from "react";
import { Swiper } from "swiper/react";
import "swiper/css";

function BestSwiper({ children }: PropsWithChildren) {
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
      {children}
    </Swiper>
  );
}

export default BestSwiper;
