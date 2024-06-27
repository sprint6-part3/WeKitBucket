import React from "react";
import LikeIcon from "@/assets/icons/like.svg";

interface IPostListProps {
  key: string;
}

function PostList({ key }: IPostListProps) {
  return (
    <li key={key} className="w-full gap-[3px] overflow-hidden border-b border-solid border-primary-gray-200 pb-[10px]">
      <h3 className="w-full truncate leading-[1.7] text-primary-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore facilis ea commodi at tempore voluptas numquam
        neque nisi corporis maxime?
      </h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="leading-[1.7] text-primary-gray-400">박동욱</p>
          <p className="leading-[1.7] text-primary-gray-400">2024.02.24.</p>
        </div>
        <div className="flex items-center gap-[7px]">
          <LikeIcon width="14.25" height="12.42" />
          <span className="leading-[1.7] text-primary-gray-400">135</span>
        </div>
      </div>
    </li>
  );
}

export default PostList;
