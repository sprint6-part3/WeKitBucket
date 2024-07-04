"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import getArticlesId from "@/apis/article/getArticlesId";
import { ArticleDetail } from "@/apis/article/deleteArticlesLike";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import DetailSection from "./components/DetailSection";

function PostDetail({ params }: { params: { id: number } }) {
  const { id } = params;
  const [articleDetail, setArticleDetail] = useState<ArticleDetail | null>(null);
  const arr = new Array(3).fill(0);

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const data = await getArticlesId(id);
        setArticleDetail(data);
      } catch (error) {
        console.error("Failed to fetch Article Detail: ", error);
      }
    };

    fetchArticleDetail();
  }, [id]);

  return (
    <main className="mx-auto grid min-w-[300px] max-w-[1060px] gap-10 px-5 py-5 sm:px-[60px] sm:pb-[46px] sm:pt-10 lg:gap-[60px] lg:pb-[130px] lg:pt-[60px]">
      {articleDetail && <DetailSection article={articleDetail} articleId={id} />}
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
