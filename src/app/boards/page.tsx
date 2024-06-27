"use client";

import { SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import Dropdown from "./components/Dropdown";
import BestPostCard from "./components/bestArticles/BestPostCard";
import BestSwiper from "./components/bestArticles/BestSwiper";
import PostList from "./components/PostList";
import SearchForm from "./components/search/SearchForm";
import Button from "./components/Button";

function Board() {
  const slides = Array.from({ length: 4 });
  const posts = Array.from({ length: 10 });

  return (
    <div className="mx-auto mb-[57px] mt-10 grid gap-5">
      {/* 베스트 게시글 */}
      <section className="grid gap-5">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-5">
          <h2 className="text-2xl font-semibold leading-[1.3] text-primary-gray-500">베스트 게시글</h2>
          <Link href="/addboard">
            <Button px={20.5}>게시물 등록하기</Button>
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
          <SearchForm />
          <Dropdown />
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
