"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { marked } from "marked";
import { useAuth } from "@/context/AuthContext";
import getArticlesId from "@/apis/article/getArticlesId";
import { ArticleDetail } from "@/apis/article/deleteArticlesLike";
import getComment, { ICommentList } from "@/apis/comment/getComment";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import DetailSection from "./components/DetailSection";

function PostDetail({ params }: { params: { id: number } }) {
  const { id } = params;
  const { user } = useAuth();
  const [articleDetail, setArticleDetail] = useState<ArticleDetail | null>(null);
  const [articleContent, setArticleContent] = useState<string | Promise<string>>("");
  const [commentList, setCommentList] = useState<ICommentList[] | null>(null);

  const fetchArticleComment = async () => {
    try {
      const data = await getComment({ articleId: id, limit: 100 });
      setCommentList(data?.list);
    } catch (error) {
      console.error("Failed to fetch Article Comment: ", error);
    }
  };

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const data = await getArticlesId(id);
        const markedData = marked(data.content);
        setArticleDetail(data);
        setArticleContent(markedData);
      } catch (error) {
        console.error("Failed to fetch Article Detail: ", error);
      }
    };

    fetchArticleDetail();
    fetchArticleComment();
  }, [id]);

  return (
    <main className="mx-auto grid max-w-[1060px] gap-10 px-5 py-5 sm:px-[60px] sm:pb-[46px] sm:pt-10 lg:gap-[60px] lg:pb-[130px] lg:pt-[60px]">
      {articleDetail && (
        <DetailSection article={articleDetail} content={articleContent} articleId={id} myId={user?.id} />
      )}
      <title>{`WiKitBucket | ${articleDetail?.title || "제목없음"}`}</title>
      <Link href="/boards" className="mx-auto">
        <button className="w-[140px] rounded-[10px] border border-solid border-primary-green-200 py-[10.5px] text-center text-sm font-semibold leading-[1.7] text-primary-green-200">
          목록으로
        </button>
      </Link>
      <section>
        <div className="font-semibold leading-[1.7] text-primary-gray-500 sm:text-lg sm:leading-[1.4]">
          댓글 <span className="text-primary-green-200">{commentList?.length}</span>
        </div>
        <CommentForm articleId={id} onCommentSubmitted={fetchArticleComment} myId={user?.id} />
        <ul className="grid gap-[14px] sm:gap-4 lg:gap-6">
          {commentList?.map(comment => (
            <CommentList list={comment} key={comment.id} myId={user?.id} onChangeApi={fetchArticleComment} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default PostDetail;
