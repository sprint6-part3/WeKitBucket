"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import LikeIcon from "@/assets/icons/like.svg";
import CameraIcon from "@/assets/icons/camera.svg";
import { IPostProps } from "../allArticles/PostList";

function BestPostCard({ post }: IPostProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, title, image, createdAt, writer, likeCount } = post;
  const { name } = writer;

  const formattedDate = dayjs(createdAt).format("YYYY.MM.DD.");
  const isImageUrl = image !== "" && image !== "https://example.com/...";

  return (
    <Link
      href={`/boards/${id}`}
      className="block h-[200px] w-[250px] sm:aspect-[1/0.73] sm:h-auto sm:w-full lg:aspect-[1/0.88]"
    >
      <div className="flex h-full flex-col overflow-visible rounded-[10px] shadow-custom-shadow">
        <div className="flex-1">
          {isImageUrl && image ? (
            <div className="relative flex h-full items-center justify-center">
              <Image src={image} alt={title} objectFit="contain" fill />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-t-[10px] bg-primary-gray-100">
              <CameraIcon />
            </div>
          )}
        </div>
        <div className="grid px-5 py-[14px]">
          <h3 className="w-full truncate font-semibold leading-[1.6]">{title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <p className="text-xs leading-[1.5] text-primary-gray-400">{name}</p>
              <p className="text-xs leading-[1.5] text-primary-gray-400">{formattedDate}</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex h-4 w-4 items-center justify-center">
                <LikeIcon width="12.67" height="11" />
              </div>
              <span className="text-xs leading-[1.2] text-primary-gray-400">{likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BestPostCard;
