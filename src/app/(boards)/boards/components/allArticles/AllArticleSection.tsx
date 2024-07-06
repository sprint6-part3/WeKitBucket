"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IArticleProps } from "@/types/articles.type";
import getArticles from "@/apis/article/getArticles";
import SearchForm from "../search/SearchForm";
import Dropdown, { ISortValue } from "../Dropdown";
import PostHeader from "./PostHeader";
import PostList from "./PostList";
import Pagination from "../Pagination";

export interface ArticleOption {
  page: number;
  pageSize: number;
  orderBy: "recent" | "like";
  keyword: string;
}

function AllArticleSection({ article }: IArticleProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultOptions: ArticleOption = {
    page: 1,
    pageSize: 10,
    orderBy: "recent",
    keyword: "",
  };

  const { totalCount } = article;
  const [total, setTotal] = useState(totalCount);
  const [articles, setArticles] = useState(article?.list || []);
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [options, setOptions] = useState<ArticleOption>({
    page: parseInt(searchParams.get("page") || defaultOptions.page.toString(), 10),
    pageSize: parseInt(searchParams.get("pageSize") || defaultOptions.pageSize.toString(), 10),
    orderBy: (searchParams.get("orderBy") as "recent" | "like") || defaultOptions.orderBy,
    keyword: searchParams.get("keyword") || defaultOptions.keyword,
  });

  const sortValue: ISortValue[] = [
    { text: "최신순", id: "recent" },
    { text: "좋아요순", id: "like" },
  ];

  const handleSort = (id: "recent" | "like") => {
    setOptions(prev => ({ ...prev, page: 1, orderBy: id }));
  };

  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    setOptions(prev => ({ ...prev, page: 1, keyword }));
  };

  const handleChangeSearchInput: React.ChangeEventHandler<HTMLInputElement> = e => {
    setKeyword(e.target.value);
  };

  const handlePaginationClick = (pageNum: number) => {
    setOptions(prev => ({ ...prev, page: pageNum }));
  };

  useEffect(() => {
    const newQuery = new URLSearchParams();
    if (options.page !== defaultOptions.page) newQuery.set("page", options.page.toString());
    if (options.pageSize !== defaultOptions.pageSize) newQuery.set("pageSize", options.pageSize.toString());
    if (options.orderBy !== defaultOptions.orderBy) newQuery.set("orderBy", options.orderBy);
    if (options.keyword && options.keyword !== defaultOptions.keyword) newQuery.set("keyword", options.keyword);

    router.replace(`?${newQuery.toString()}`);
  }, [options, router]);

  useEffect(() => {
    const getArticlesWithOptions = async () => {
      try {
        const res = await getArticles(options);
        setArticles(res?.list);
        setTotal(res?.totalCount);
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
      {options.page && options.pageSize && (
        <Pagination
          totalCount={total}
          currentPage={options.page}
          pageSize={options.pageSize}
          onClick={handlePaginationClick}
          groupSize={5}
        />
      )}
    </section>
  );
}

export default AllArticleSection;
