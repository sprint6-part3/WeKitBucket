import Link from "next/link";
import getArticles, { ArticleOption } from "@/apis/article/getArticles";
import Dropdown from "./components/Dropdown";
import PostList from "./components/allArticles/PostList";
import SearchForm from "./components/search/SearchForm";
import Button from "./components/Button";
import BestPostList from "./components/bestArticles/BestPostList";
import PostHeader from "./components/allArticles/PostHeader";

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
    allArticles = await getArticles(allArticlesOption);
    bestArticles = await getArticles(bestArticlesOption);
  } catch (error) {
    console.error("Failed to fetch articles");
  }

  return (
    <div className="mx-auto mb-[57px] mt-10 grid gap-5">
      {/* 베스트 게시글 */}
      <section className="grid gap-5">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-5 sm:px-[60px]">
          <h2 className="text-2xl font-semibold leading-[1.3] text-primary-gray-500">베스트 게시글</h2>
          <Link href="/addboard">
            <Button padding>게시물 등록하기</Button>
          </Link>
        </div>

        {bestArticles && <BestPostList article={bestArticles?.list} />}
      </section>
      <section className="mx-auto grid w-full max-w-[1180px] gap-[30px] px-5 sm:gap-5 sm:px-[60px] md:gap-5">
        {/* 검색 및 정렬 영역 */}
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
          <SearchForm />
          <Dropdown />
        </div>
        {/* 리스트 영역 */}
        <div className="w-full">
          <ul className="grid w-full gap-[14px]">
            <PostHeader />
            {allArticles?.list.map(article => <PostList key={article.id} post={article} />)}
          </ul>
        </div>
        {/* 페이지네이션 영역 */}
        <div className="mt-10">페이지네이션</div>
      </section>
    </div>
  );
}

export default Board;
