"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
// import Slide1 from "@/assets/icons/landingSwiper1.svg";
// import Slide2 from "@/assets/icons/landingSwiper2.svg";
// import Slide3 from "@/assets/icons/landingSwiper3.svg";
// import Slide4 from "@/assets/icons/landingSwiper4.svg";
import Image from "next/image";

function SwiperSection() {
  return (
    <div className="mt-10 md:mt-20 xl:mt-[160px]">
      <Swiper
        modules={[Autoplay]}
        loop
        autoplay={{
          delay: 1500,
        }}
        speed={750}
        slidesPerView={3.5}
        spaceBetween={10}
        centeredSlides
        breakpoints={{
          768: {
            spaceBetween: 20,
            slidesPerView: 4.5,
          },
          1280: {
            spaceBetween: 30,
            slidesPerView: 5.1,
          },
          1440: {
            spaceBetween: 50,
            slidesPerView: 5.5,
          },
        }}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <SwiperSlide key={String(index + 1)}>
            <div className="aspect-square h-full">
              <Image
                src={`/images/landingSwiper${(index % 4) + 1}.svg`}
                alt="슬라이드 이미지"
                fill
                sizes="max-width:100%"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperSection;
