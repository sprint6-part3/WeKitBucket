"use client";

import { SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import SearchIcon from "@/assets/icons/search.svg";
import Dropdown from "./components/Dropdown";
import BestPostCard from "./components/BestPostCard";
import BestSwiper from "./components/BestSwiper";
import PostList from "./components/PostList";

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
          <BestSwiper>
            {slides.map((slide, idx) => (
              <SwiperSlide key={String(idx + 1)} style={{ width: "auto" }} className="py-5">
                <BestPostCard />
              </SwiperSlide>
            ))}
          </BestSwiper>
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
              <PostList key={String(idx + 1)} />
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
