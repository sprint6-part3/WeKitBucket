"use client";

import React, { useEffect, useState } from "react";
import { IArticleProps } from "@/types/articles";
import getArticles, { ArticleOption } from "@/apis/article/getArticles";
import SearchForm from "../search/SearchForm";
import Dropdown, { ISortValue } from "../Dropdown";
import PostHeader from "./PostHeader";
import PostList from "./PostList";

function AllArticleSection({ article }: IArticleProps) {
  const [articles, setArticles] = useState(article?.list || []);
  const [keyword, setKeyword] = useState("");
  const [options, setOptions] = useState<ArticleOption>({
    page: 1,
    pageSize: 10,
    orderBy: "recent",
    keyword: "",
  });
  const sortValue: ISortValue[] = [
    {
      text: "최신순",
      id: "recent",
    },
    {
      text: "좋아요순",
      id: "like",
    },
  ];

  const handleSort = (id: "recent" | "like") => {
    setOptions(prev => ({
      ...prev,
      orderBy: `${id}`,
    }));
  };

  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    setOptions(prev => ({
      ...prev,
      keyword: `${keyword}`,
    }));
  };

  const handleChangeSearchInput: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.target;
    setKeyword(value);
  };

  useEffect(() => {
    const getArticlesWithOptions = async () => {
      try {
        const res = await getArticles(options);
        setArticles(res?.list);
      } catch (error) {
        console.error("Failed to fetch getArticles: ", error);
      }
    };

    getArticlesWithOptions();
  }, [options]);

  return (
    <section className="mx-auto grid w-full max-w-[1180px] gap-[30px] px-5 sm:gap-5 sm:px-[60px] md:gap-5">
      {/* 검색 및 정렬 영역 */}
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
        <SearchForm onSubmit={handleSearchSubmit} onChange={handleChangeSearchInput} value={keyword} />
        <Dropdown sortValue={sortValue} onClick={handleSort} />
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
