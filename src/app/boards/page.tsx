"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import LikeIcon from "@/assets/icons/like.svg";
import CameraIcon from "@/assets/icons/camera.svg";
import SearchIcon from "@/assets/icons/search.svg";
import Dropdown from "./components/Dropdown";

function Board() {
  const slides = Array.from({ length: 4 });
  const posts = Array.from({ length: 10 });

  return (
    <div className="mx-auto mb-[57px] mt-10 grid gap-5">
      <section className="grid gap-5">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-5">
          <h2 className="text-2xl font-semibold leading-[1.3] text-primary-gray-500">베스트 게시글</h2>
          <Link
            href="/addboard"
            className="rounded-[10px] bg-primary-green-200 px-[20.5px] py-[10.5px] text-sm font-semibold leading-[1.7] text-white"
          >
            게시물 등록하기
          </Link>
        </div>
        <div className="w-full overflow-hidden">
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
                <div className="h-[200px] w-[250px]">
                  <div className="flex h-full flex-col overflow-visible rounded-[10px] shadow-custom-shadow">
                    <div className="flex-1">
                      <div className="flex h-full items-center justify-center rounded-t-[10px] bg-primary-gray-100">
                        <CameraIcon />
                      </div>
                    </div>
                    <div className="grid px-5 py-[14px]">
                      <h3 className="w-full truncate font-semibold leading-[1.6]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, dignissimos.
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <p className="text-xs leading-[1.5] text-primary-gray-400">박동욱</p>
                          <p className="text-xs leading-[1.5] text-primary-gray-400">2024.02.24.</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex h-4 w-4 items-center justify-center">
                            <LikeIcon width="12.67" height="11" />
                          </div>
                          <span className="text-xs leading-[1.2] text-primary-gray-400">135</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className="mx-auto grid w-full max-w-[1240px] gap-[30px] px-5">
        {/* 검색 및 정렬 영역 */}
        <div className="flex flex-col items-center justify-center gap-5">
          <form className="flex w-full items-center gap-[15px]">
            <div className="relative flex-1">
              <input
                placeholder="제목을 입력해 주세요"
                className="w-full rounded-[10px] bg-primary-gray-100 py-[7px] pl-[47px] pr-[15px] font-medium leading-[1.7] placeholder:text-primary-gray-400 focus:outline-none"
              />
              <div className="absolute left-[17px] top-1/2 -translate-y-1/2">
                <SearchIcon width={17} height={17} />
              </div>
            </div>
            <button
              type="submit"
              className="rounded-[10px] bg-primary-green-200 px-[27.5px] py-[10.5px] text-sm font-semibold leading-[1.7] text-white"
            >
              검색
            </button>
          </form>
          <div className="relative w-full">
            <Dropdown />
          </div>
        </div>
        {/* 리스트 영역 */}
        <div className="w-full">
          <ul className="grid w-full gap-[14px]">
            {posts.map((post, idx) => (
              <li
                key={String(idx + 1)}
                className="w-full gap-[3px] overflow-hidden border-b border-solid border-primary-gray-200 pb-[10px]"
              >
                <h3 className="w-full truncate leading-[1.7] text-primary-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore facilis ea commodi at tempore voluptas
                  numquam neque nisi corporis maxime?
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <p className="leading-[1.7] text-primary-gray-400">박동욱</p>
                    <p className="leading-[1.7] text-primary-gray-400">2024.02.24.</p>
                  </div>
                  <div className="flex items-center gap-[7px]">
                    <LikeIcon width="14.25" height="12.42" />
                    <span className="leading-[1.7] text-primary-gray-400">135</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* 페이지네이션 영역 */}
        <div>페이지네이션</div>
      </section>
    </div>
  );
}

export default Board;
