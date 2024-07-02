"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";
import Image from "next/image";
import EditIcon from "@/assets/icons/pencilIcon.svg";
import DeleteIcon from "@/assets/icons/trashIcon.svg";
import LikeIcon from "@/assets/icons/like.svg";
import postArticlesLike from "@/apis/article/postArticlesLike";

export interface ArticleDetail {
  id: number;
  title: string;
  content: string;
  image?: string;
  likeCount?: number;
  isLiked: any;
  createdAt: string;
  updatedAt?: string;
  writer: {
    id: number;
    name: string;
  };
}

interface IArticleDetailProps {
  article: ArticleDetail;
  articleId: number;
}

function DetailSection({ article, articleId }: IArticleDetailProps) {
  const { title, content, image, isLiked, likeCount, createdAt, writer } = article;
  const { id, name } = writer;

  /**
   * @TODO 로그인 토큰 유효성, 갱신 로직 추가 후 테스트
   */
  const handleClickLikeButton = async () => {
    try {
      await postArticlesLike(articleId);
    } catch (error) {
      console.error("Failed to fetch articles like: ", error);
      /**
       * @TODO 비로그인시 로그인 페이지로 리다이렉트
       */
    }
  };

  return (
    <section className="rounded-[10px] px-5 pb-[14px] pt-5 shadow-custom-shadow sm:px-[30px] sm:py-10">
      <div className="grid gap-[14px] border-b-[1px] border-solid border-primary-gray-200 pb-[10px] sm:gap-[31.5px] sm:pb-2 lg:gap-[30px] lg:border-none">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="break-keep text-2xl font-semibold leading-[1.3] text-primary-gray-500 sm:text-[32px] sm:leading-[1.3]">
            {title}
          </h1>
          <div className="ml-auto flex items-center justify-between gap-[12px]">
            <button className="flex h-[22px] w-[22px] items-center justify-center px-[3.21px] py-[3.21px]">
              <EditIcon />
            </button>
            <button className="flex h-6 w-6 items-center justify-center px-[4.5px] py-[3.5px]">
              <DeleteIcon />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-[10px]">
            <p className="text-xs leading-[1.5] text-primary-gray-400 sm:text-sm sm:leading-[1.7]">{name}</p>
            <p className="text-xs leading-[1.5] text-primary-gray-400 sm:text-sm sm:leading-[1.7]">2024.02.24.</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClickLikeButton}
              className="flex h-4 w-4 items-center justify-center px-[1.6px] py-[2.5px] sm:h-[18px] sm:w-[18px] sm:px-[1.87px] sm:pb-[3.22px] sm:pt-[2.36px]"
            >
              <LikeIcon width="100%" height="100%" />
            </button>
            <p className="text-xs leading-[1.5] text-primary-gray-400 sm:text-sm sm:leading-[1.7]">{likeCount}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-[15px] pt-[15px] sm:gap-5 sm:pt-[30px]">
        {image && image !== "https://example.com/..." && (
          <div className="relative w-full max-w-[500px]">
            <Image fill src={image} alt={title} />
          </div>
        )}
        <div className="break-keep text-sm leading-[1.7] text-primary-gray-500 sm:text-base">{content}</div>
      </div>
    </section>
  );
}

export default DetailSection;
