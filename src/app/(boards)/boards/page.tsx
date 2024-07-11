import { Metadata } from "next";
import getArticles from "@/apis/article/getArticles";
import BestPostList from "./components/bestArticles/BestPostList";
import AllArticleSection, { ArticleOption } from "./components/allArticles/AllArticleSection";
import BestHeader from "./components/bestArticles/BestHeader";

export const metadata: Metadata = {
  title: "WeKitBucket | 자유게시판",
};

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
      <section className="grid gap-5">
        <BestHeader />
        {bestArticles && <BestPostList article={bestArticles} />}
      </section>
      {allArticles && <AllArticleSection article={allArticles} />}
    </div>
  );
}

export default Board;
