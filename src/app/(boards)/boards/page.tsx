"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import getArticles from "@/apis/article/getArticles";
import { ArticleData } from "@/types/articles.type";
import BestPostList from "./components/bestArticles/BestPostList";
import AllArticleSection, { ArticleOption } from "./components/allArticles/AllArticleSection";
import BestHeader from "./components/bestArticles/BestHeader";

function Board() {
  const [allArticles, setAllArticles] = useState<ArticleData | null>(null);
  const [bestArticles, setBestArticles] = useState<ArticleData | null>(null);

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

  useEffect(() => {
    const fetchGetArticles = async () => {
      try {
        const all = await getArticles(allArticlesOption);
        const best = await getArticles(bestArticlesOption);
        setAllArticles(all);
        setBestArticles(best);
      } catch (error) {
        console.error("Failed to fetch articles: ", error);
      }
    };

    fetchGetArticles();
  }, []);

  return (
    <div className="mx-auto mb-[57px] mt-10 grid gap-5">
      {/* 베스트 게시글 */}
      <section className="grid gap-5">
        <BestHeader />
        {bestArticles && <BestPostList article={bestArticles} />}
      </section>
      {allArticles && <AllArticleSection article={allArticles} />}
    </div>
  );
}

export default Board;
