import React from "react";
import Link from "next/link";
// import { redirect } from "next/navigation";
// import { cookies } from "next/headers";
import getArticlesId from "@/apis/article/getArticlesId";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import DetailSection from "./components/DetailSection";

async function PostDetail({ params }: { params: { id: number } }) {
  const arr = new Array(3).fill(0);

  const { id } = params;

  let articleDetail;
  // let token;
  // const getAuthToken = () => cookies().get("accessToken")?.value;

  try {
    // token = getAuthToken();

    // if (!token) {
    //   throw new Error("로그인이 필요합니다.");
    // }

    articleDetail = await getArticlesId(id);
  } catch (error) {
    console.error("Failed to fetch Article Detail: ", error);

    if (error instanceof Error) {
      // if (error.message === "로그인이 필요합니다.") {
      //   redirect("/login");
      // }
    }
  }

  console.log(articleDetail, id);
  return (
    <main className="mx-auto grid min-w-[300px] max-w-[1060px] gap-10 px-5 py-5 sm:px-[60px] sm:pb-[46px] sm:pt-10 lg:gap-[60px] lg:pb-[130px] lg:pt-[60px]">
      <DetailSection />
      <Link href="/boards" className="mx-auto">
        <button className="w-[140px] rounded-[10px] border border-solid border-primary-green-200 py-[10.5px] text-center text-sm font-semibold leading-[1.7] text-primary-green-200">
          목록으로
        </button>
      </Link>
      <section>
        <div className="font-semibold leading-[1.7] text-primary-gray-500 sm:text-lg sm:leading-[1.4]">
          댓글 <span className="text-primary-green-200">29</span>
        </div>
        <CommentForm />
        <ul className="grid gap-[14px] sm:gap-4 lg:gap-6">
          {arr?.map((_, idx) => <CommentList key={String(idx + 1)} />)}
        </ul>
      </section>
    </main>
  );
}

export default PostDetail;
