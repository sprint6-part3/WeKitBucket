import Link from "next/link";
import React from "react";

type PageItemProps = {
  children: number;
  keyword: string;
  page?: number;
};

function PageItem({ children, keyword, page = 1 }: PageItemProps) {
  const isPage: boolean = Number(page) === children;

  return (
    <Link
      href={`/wikilist?${keyword ? `keyword=${keyword}` : ""}&number=${children}`}
      className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-primary-gray-400 shadow-[0_4px_20px_rgba(0,0,0,0.08)] ${isPage ? "text-primary-green-200" : ""}`}
    >
      {children}
    </Link>
  );
}

export default PageItem;
