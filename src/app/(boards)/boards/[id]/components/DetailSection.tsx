"use client";

/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";
import Image from "next/image";
import EditIcon from "@/assets/icons/pencilIcon.svg";
import DeleteIcon from "@/assets/icons/trashIcon.svg";
import testImg from "@/assets/images/middleSectionItem1.webp";

function DetailSection() {
  return (
    <section className="rounded-[10px] px-5 pb-[14px] pt-5 shadow-custom-shadow sm:px-[30px] sm:py-10">
      <div className="grid gap-[14px] border-b-[1px] border-solid border-primary-gray-200 pb-[10px] sm:gap-[31.5px] sm:pb-2 lg:gap-[30px] lg:border-none">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-semibold leading-[1.3] text-primary-gray-500 sm:text-[32px] sm:leading-[1.3]">
            게시글 제목입니다.
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
            <p className="text-xs leading-[1.5] text-primary-gray-400 sm:text-sm sm:leading-[1.7]">박동욱</p>
            <p className="text-xs leading-[1.5] text-primary-gray-400 sm:text-sm sm:leading-[1.7]">2024.02.24.</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex h-4 w-4 items-center justify-center px-[1.6px] py-[2.5px] sm:h-[18px] sm:w-[18px] sm:px-[1.87px] sm:pb-[3.22px] sm:pt-[2.36px]">
              {/* <LikeIcon width="100%" height="100%" /> */}
            </div>
            <p className="text-xs leading-[1.5] text-primary-gray-400 sm:text-sm sm:leading-[1.7]">135</p>
          </div>
        </div>
      </div>
      <div className="grid gap-[15px] pt-[15px] sm:gap-5 sm:pt-[30px]">
        <div className="w-full max-w-[500px]">
          <Image src={testImg} alt="이미지" />
        </div>
        <div className="text-sm leading-[1.7] text-primary-gray-500 sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa atque sequi voluptate, facilis magnam culpa
          asperiores veniam blanditiis doloremque sint rem. Animi saepe, ut a dolorem velit dolorum laboriosam
          accusantium.
        </div>
      </div>
    </section>
  );
}

export default DetailSection;
