"use client";

/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from "react";
import PrevIcon from "@/assets/icons/prev.svg";
import NextIcon from "@/assets/icons/next.svg";

interface IPaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onClick: (number: number) => void;
}

function Pagination({ totalCount, currentPage, pageSize, onClick }: IPaginationProps) {
  const GROUP_SIZE = 2;
  const [pageGroup, setPageGroup] = useState(Math.ceil(currentPage / GROUP_SIZE));
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const totalPage =
    totalCount % pageSize > 0 ? Math.floor(totalCount / pageSize) + 1 : Math.floor(totalCount / pageSize);
  const isFirstNumber = currentPage === 1;
  const isLastNumber = currentPage === totalPage;

  let lastNum = pageGroup * GROUP_SIZE;
  if (lastNum > totalPage) {
    lastNum = totalPage;
  }
  let firstNum = GROUP_SIZE >= lastNum ? 1 : GROUP_SIZE * (pageGroup - 1) + 1;

  useEffect(() => {
    const newPageNumbers = Array.from({ length: lastNum - firstNum + 1 }, (_, index) => firstNum + index);
    setPageNumbers(newPageNumbers);
  }, [pageGroup, firstNum, lastNum]);

  const onClickNumberBtn: (number: number) => void = value => {
    onClick(value);
  };

  const onClickPrevBtn = () => {
    if (currentPage === firstNum) {
      setPageGroup(pageGroup - 1);
    }
    onClick(currentPage - 1);
  };

  const onClickNextBtn = () => {
    if (currentPage === lastNum) {
      setPageGroup(pageGroup + 1);
    }
    onClick(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-[10px] sm:mt-[30px] sm:gap-[15px]">
      {isFirstNumber ? (
        <div className="h-10 w-10 sm:h-[45px] sm:w-[45px]" />
      ) : (
        <button
          type="button"
          onClick={onClickPrevBtn}
          className="flex h-10 w-10 items-center justify-center rounded-[10px] shadow-custom-shadow sm:h-[45px] sm:w-[45px]"
        >
          <div className="flex h-2 w-[6px] items-center justify-center sm:h-[10px] sm:w-[6px]">
            <PrevIcon />
          </div>
        </button>
      )}

      {pageNumbers.map(num => (
        <button
          key={num}
          type="button"
          onClick={() => onClickNumberBtn(num)}
          className="flex h-10 w-10 items-center justify-center rounded-[10px] shadow-custom-shadow sm:h-[45px] sm:w-[45px]"
        >
          <span
            className={`text-xs sm:text-lg ${currentPage === num ? "text-primary-green-200" : "text-primary-gray-400"}`}
          >
            {num}
          </span>
        </button>
      ))}
      {isLastNumber ? (
        <div className="h-10 w-10" />
      ) : (
        <button
          type="button"
          onClick={onClickNextBtn}
          className="flex h-10 w-10 items-center justify-center rounded-[10px] shadow-custom-shadow sm:h-[45px] sm:w-[45px]"
        >
          <div className="flex h-2 w-[6px] items-center justify-center sm:h-[10px] sm:w-[6px]">
            <NextIcon />
          </div>
        </button>
      )}
    </div>
  );
}

export default Pagination;
