import React from "react";
import PageItem from "./PageItem";

type PaginationProps = {
  totalCount: number;
};

function Pagination({ totalCount }: PaginationProps) {
  const pageItemCount = Math.floor(totalCount / 3);
  const pageArray: Array<string | number> = Array.from({ length: pageItemCount }, (_, index) => index + 1);

  pageArray.unshift("<");
  pageArray.push(">");

  return (
    <div className="mt-14 flex items-center justify-center gap-2 rounded-xl border p-2 md:mt-20 xl:mt-[120px]">
      {pageArray.map((item, index) => (
        <PageItem key={item} isFirst={index === 0} isLast={index === pageArray.length - 1}>
          {item}
        </PageItem>
      ))}
    </div>
  );
}

export default Pagination;
