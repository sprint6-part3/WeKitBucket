"use client";

import React, { useState, useEffect } from "react";
import CustomButton from "./CustomButton";
import QuillEditor from "./QuillEditor";

const TITLE_MAX_LEN = 30;

function AddBoard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contentLength, setContentLength] = useState({ withSpaces: 0, withoutSpaces: 0 });
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = () => {
    console.log("Title:", title);
    console.log("Content:", content);
  };

  const handleSearchItem = (editorContent: string, length: { withSpaces: number; withoutSpaces: number }) => {
    setContent(editorContent);
    setContentLength(length);
  };

  useEffect(() => {
    setIsValid(title.trim().length > 0 && content.trim().length > 0);
  }, [title, content]);

  return (
    <div className="center mx-[20px] my-[90px] flex-col">
      <main className="w-full flex-col gap-3 md:flex md:gap-5 md:px-[30px] md:py-[40px]">
        <div className="flex items-center justify-between">
          <h2 className="md:text-xl-semibold text-sm-regular lg:text-2xl-semibold">게시물 등록하기</h2>
          <div className="flex gap-[8px]">
            <CustomButton isActive={isValid} disabled={!isValid} onClick={handleSubmit} variant="primary">
              임시저장
            </CustomButton>
            <CustomButton isActive={isValid} disabled={!isValid} onClick={handleSubmit} variant="secondary">
              등록하기
            </CustomButton>
          </div>
        </div>
        <span className="mt-[16px] text-xs-bold text-gray-400 md:text-lg-regular">등록일, 작성자</span>
        <div className="flex w-full items-center justify-between gap-2 border-y border-b border-gray-200 py-3 text-sm-regular">
          <input
            onChange={e => {
              setTitle(e.target.value);
            }}
            value={title}
            className="md:text-xl-medium flex flex-1 items-center justify-between gap-2"
            placeholder="제목을 입력해주세요"
            maxLength={TITLE_MAX_LEN}
          />
          <span className="text-sm-regular text-gray-500 md:text-md-medium">
            {title.length}/<span className="text-gray-500">{TITLE_MAX_LEN}</span>
          </span>
        </div>

        <span className="text-sm-regular-14 text-gray-500 md:text-lg-medium">
          공백포함 : 총<span className="text-gray-500"> {contentLength.withSpaces}</span>자 | 공백제외: 총
          <span className="text-gray-500"> {contentLength.withoutSpaces}</span>자
        </span>
        <div className="relative">
          <div className="w-full">
            <QuillEditor setContent={handleSearchItem} content={content} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddBoard;
