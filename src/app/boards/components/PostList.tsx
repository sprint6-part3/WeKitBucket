import React from "react";
import LikeIcon from "@/assets/icons/like.svg";
import useWindowSize from "@/hooks/useWindowSize";

interface IPostListProps {
  key: string;
}

function PostList({ key }: IPostListProps) {
  const windowSize = useWindowSize();
  const isPc = windowSize > 640 && windowSize !== 0;
  const isMobile = windowSize < 640 && windowSize !== 0;

  return (
    <li
      key={key}
      className="w-full gap-[3px] overflow-hidden border-b border-solid border-primary-gray-200 pb-[10px] sm:flex sm:gap-[50px] sm:px-5 lg:gap-20 lg:px-[50px]"
    >
      {isPc && <p className="min-w-[3%] text-center leading-[1.7] text-primary-gray-500">134</p>}
      <h3 className="w-full truncate leading-[1.7] text-primary-gray-500 sm:text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore facilis ea commodi at tempore voluptas numquam
        neque nisi corporis maxime?
      </h3>
      <div className="flex items-center justify-between sm:gap-[50px] lg:gap-20">
        <div className="flex items-center gap-4 sm:gap-[50px] lg:gap-20">
          <p className="break-keep leading-[1.7] text-primary-gray-400 sm:w-[7%] sm:text-primary-gray-500">박동욱</p>
          {isPc && <p className="leading-[1.7] text-primary-gray-500">135</p>}
          <p className="leading-[1.7] text-primary-gray-400 sm:text-primary-gray-500">2024.02.24.</p>
        </div>
        {isMobile && (
          <div className="flex items-center gap-[7px]">
            <LikeIcon width="14.25" height="12.42" />
            <span className="leading-[1.7] text-primary-gray-400 sm:text-primary-gray-500">135</span>
          </div>
        )}
      </div>
    </li>
  );
}

export default PostList;
