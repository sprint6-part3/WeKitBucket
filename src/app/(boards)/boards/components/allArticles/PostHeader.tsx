"use client";

import useWindowSize from "@/hooks/useWindowSize";
import React from "react";

function PostHeader() {
  const windowSize = useWindowSize();
  const isPc = windowSize >= 640 && windowSize !== 0;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isPc && (
        <li className="board-tr w-full overflow-hidden border-b border-t border-solid border-primary-gray-200 pb-[10px] sm:pt-[10px]">
          <p className="hidden justify-center text-center leading-[1.7] text-primary-gray-400 sm:block sm:text-center">
            번호
          </p>
          <h3 className="w-full truncate text-center leading-[1.7] text-primary-gray-400">제목</h3>
          <div className="board-td-info items-center">
            <p className="text-center leading-[1.7] text-primary-gray-400">작성자</p>
            <p className="text-center leading-[1.7] text-primary-gray-400">좋아요</p>
            <p className="text-center leading-[1.7] text-primary-gray-400">날짜</p>
          </div>
        </li>
      )}
    </>
  );
}

export default PostHeader;
