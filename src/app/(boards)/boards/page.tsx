"use server";

import Link from "next/link";
import getArticles from "@/apis/article/getArticles";
import Button from "./components/Button";
import BestPostList from "./components/bestArticles/BestPostList";
import AllArticleSection, { ArticleOption } from "./components/allArticles/AllArticleSection";

async function Board() {
  const allArticlesOption: ArticleOption = {
    page: 1,
    pageSize: 10,
    orderBy: "recent",
  };

  const bestArticlesOption: ArticleOption = {
    page: 1,
    pageSize: 4,
    orderBy: "like",
  };

  let allArticles;
  let bestArticles;

  try {
    [allArticles, bestArticles] = await Promise.all([getArticles(allArticlesOption), getArticles(bestArticlesOption)]);
  } catch (error) {
    console.error("Failed to fetch articles: ", error);
  }

  return (
    <div className="mx-auto mb-[57px] mt-10 grid gap-5">
      {/* 베스트 게시글 */}
      <section className="grid gap-5">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-5 sm:px-[60px]">
          <h2 className="text-2xl font-semibold leading-[1.3] text-primary-gray-500">베스트 게시글</h2>
          <Link href="/addboard">
            <Button variants="md">게시물 등록하기</Button>
          </Link>
        </div>

        {bestArticles && <BestPostList article={bestArticles} />}
      </section>
      {allArticles && <AllArticleSection article={allArticles} />}
    </div>
  );
}

export default Board;
