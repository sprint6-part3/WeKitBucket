"use client";

import React from "react";
import LikeIcon from "@/assets/icons/like.svg";

function PostList() {
  return (
    <li className="board-tr w-full overflow-hidden border-b border-solid border-primary-gray-200 pb-[10px]">
      <p className="hidden justify-center text-center leading-[1.7] text-primary-gray-500 sm:block sm:text-center">
        134
      </p>
      <h3 className="w-full truncate leading-[1.7] text-primary-gray-500 sm:text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore facilis ea commodi at tempore voluptas numquam
        neque nisi corporis maxime?
      </h3>
      <div className="flex items-center justify-between sm:gap-[50px] lg:gap-20">
        <div className="board-td-info items-center">
          <p className="break-keep leading-[1.7] text-primary-gray-400 sm:truncate sm:text-center sm:text-primary-gray-500">
            박동욱
          </p>
          <p className="hidden leading-[1.7] text-primary-gray-500 sm:block sm:truncate sm:text-center">135</p>
          <p className="leading-[1.7] text-primary-gray-400 sm:truncate sm:text-center sm:text-primary-gray-500">
            2024.02.24.
          </p>
        </div>
        <div className="flex items-center gap-[7px] sm:hidden">
          <LikeIcon width="14.25" height="12.42" />
          <span className="leading-[1.7] text-primary-gray-400 sm:text-primary-gray-500">135</span>
        </div>
      </div>
    </li>
  );
}

export default PostList;
