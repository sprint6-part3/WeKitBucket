"use client";

import React, { useState } from "react";
import { IArticleProps } from "@/types/articles";
import getArticles, { ArticleOption } from "@/apis/article/getArticles";
import SearchForm from "../search/SearchForm";
import Dropdown from "../Dropdown";
import PostHeader from "./PostHeader";
import PostList from "./PostList";

function AllArticleSection({ article }: IArticleProps) {
  const [articles, setArticles] = useState(article?.list || []);
  const [options, setOptions] = useState<ArticleOption>({
    page: 1,
    pageSize: 10,
    orderBy: "recent",
    keyword: "",
  });

  /**
   * 검색 기능 handle 함수
   */
  // const handleSort = () => {};

  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();

    try {
      const res = await getArticles(options);
      setArticles(res?.list);
    } catch (error) {
      console.error("Failed to fetch getArticles: ", error);
      // eslint-disable-next-line no-alert
      alert("죄송합니다, 현재 검색을 처리할 수 없습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  const handleChangeSearchInput: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.target;
    setOptions(prev => ({
      ...prev,
      keyword: `${value}`,
    }));
  };

  return (
    <section className="mx-auto grid w-full max-w-[1180px] gap-[30px] px-5 sm:gap-5 sm:px-[60px] md:gap-5">
      {/* 검색 및 정렬 영역 */}
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
        <SearchForm onSubmit={handleSearchSubmit} onChange={handleChangeSearchInput} value={options.keyword} />
        <Dropdown />
      </div>
      {/* 리스트 영역 */}
      <div className="w-full">
        <ul className="grid w-full gap-[14px]">
          <PostHeader />
          {articles?.map(post => <PostList key={post.id} post={post} />)}
        </ul>
      </div>
      {/* 페이지네이션 영역 */}
      <div className="mt-10">페이지네이션</div>
    </section>
  );
}

export default AllArticleSection;
