"use client";

/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import EditIcon from "@/assets/icons/pencilIcon.svg";
import DeleteIcon from "@/assets/icons/trashIcon.svg";
import LikeIcon from "@/assets/icons/like.svg";
import postArticlesLike from "@/apis/article/postArticlesLike";
import deleteArticlesLike, { ArticleDetail } from "@/apis/article/deleteArticlesLike";
import dayjs from "dayjs";
// import getArticlesId from "@/apis/article/getArticlesId";
import { useRouter } from "next/navigation";

interface IArticleDetailProps {
  article: ArticleDetail;
  articleId: number;
}

function DetailSection({ article, articleId }: IArticleDetailProps) {
  const router = useRouter();
  const [imgError, setImgError] = useState<boolean | undefined>();
  const [options, setOptions] = useState<ArticleDetail>(article);

  const formattedDate = dayjs(options.createdAt).format("YYYY.MM.DD.");

  // 좋아요 버튼 클릭 함수
  const handleClickLikeButton = async () => {
    try {
      let res;
      if (options.isLiked) {
        res = await deleteArticlesLike(articleId);
      } else {
        res = await postArticlesLike(articleId);
      }
      setOptions(prev => ({
        ...prev,
        ...res,
      }));
    } catch (error) {
      if (error instanceof Error) {
        if (error?.message === "Unauthorized: No refresh token available") {
          alert("로그인이 필요합니다.");
          router.push("/login");
        } else {
          console.error("Failed to fetch articles like: ", error);
        }
      }
    }
  };

  useEffect(() => {
    const imgClass = new Image();
    imgClass.src = options.image ?? "";

    imgClass.onload = () => {
      setImgError(false);
    };

    imgClass.onerror = () => {
      setImgError(true);
    };
  }, [options.image]);

  return (
    <section className="rounded-[10px] px-5 pb-[14px] pt-5 shadow-custom-shadow sm:px-[30px] sm:py-10">
      <div className="grid gap-[14px] border-b-[1px] border-solid border-primary-gray-200 pb-[10px] sm:gap-[31.5px] sm:pb-2 lg:gap-[30px] lg:border-none">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="break-keep text-2xl font-semibold leading-[1.3] text-primary-gray-500 sm:text-[32px] sm:leading-[1.3]">
            {options.title}
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
            <p className="text-xs leading-[1.5] text-primary-gray-400 sm:text-sm sm:leading-[1.7]">
              {options.writer.name}
            </p>
            <p className="text-xs leading-[1.5] text-primary-gray-400 sm:text-sm sm:leading-[1.7]">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClickLikeButton}
              className="flex h-4 w-4 items-center justify-center px-[1.6px] py-[2.5px] sm:h-[18px] sm:w-[18px] sm:px-[1.87px] sm:pb-[3.22px] sm:pt-[2.36px]"
            >
              {options.isLiked ? (
                <LikeIcon width="100%" height="100%" fill="#4cbfa4" />
              ) : (
                <LikeIcon width="100%" height="100%" fill="#8f95b2" />
              )}
            </button>
            <p className="text-xs leading-[1.5] text-primary-gray-400 sm:text-sm sm:leading-[1.7]">
              {options.likeCount}
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-[15px] pt-[15px] sm:gap-5 sm:pt-[30px]">
        {options.image && imgError === false && (
          <div>
            <NextImage width={500} height={100} src={options.image} alt={options.title} />
          </div>
        )}
        <div className="text-sm leading-[1.7] text-primary-gray-500 sm:text-base">{options.content}</div>
      </div>
    </section>
  );
}

export default DetailSection;
