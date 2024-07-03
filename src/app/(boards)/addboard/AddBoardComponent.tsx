"use client";

import React, { useState, useEffect, HTMLAttributes } from "react";
import postArticles from "@/apis/article/postArticles";
import dynamic from "next/dynamic";
import CustomButton from "./CustomButton";

const TITLE_MAX_LEN = 30;

const QuillEditor = dynamic(() => import("./QuillEditor"), {
  ssr: false,
});

interface AddBoardClientProps extends HTMLAttributes<HTMLDivElement> {
  initialTitle?: string;
  initialContent?: string;
  initialImageUrl?: string;
}

interface ContentLength {
  withSpaces: number;
  withoutSpaces: number;
}

interface ArticleInput {
  title: string;
  content: string;
  image?: string;
}

interface ErrorResponse {
  message: string;
}

function AddBoardComponent({
  initialTitle = "",
  initialContent = "",
  initialImageUrl = undefined,
  className,
  ...rest
}: AddBoardClientProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [contentLength, setContentLength] = useState<ContentLength>({ withSpaces: 0, withoutSpaces: 0 });
  const [isValid, setIsValid] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const stripHtmlTags = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleSubmit = async () => {
    try {
      const strippedContent = stripHtmlTags(content);
      const articleInput: ArticleInput = {
        title,
        content: strippedContent,
        image: imageUrl,
      };

      console.log("Sending data:", articleInput);

      await postArticles(articleInput);
      setFeedbackMessage("게시물이 성공적으로 등록되었습니다!");
      setTitle("");
      setContent("");
      setImageUrl("");
      setContentLength({ withSpaces: 0, withoutSpaces: 0 });
    } catch (error: unknown) {
      console.error("게시물 등록 실패:", error);
      const errorMessage = (error as ErrorResponse).message;
      setFeedbackMessage(`게시물 등록 실패: ${errorMessage}`);
    }
  };

  const handleSearchItem = (editorContent: string, length: ContentLength) => {
    setContent(editorContent);
    setContentLength(length);
  };

  useEffect(() => {
    setIsValid(title.trim().length > 0 && content.trim().length > 0);
  }, [title, content]);

  return (
    <div className={className} {...rest}>
      <div className="flex items-center justify-between">
        <h2 className="md:text-xl-semibold text-sm-regular lg:text-2xl-semibold">게시물 등록하기</h2>
        <div className="flex gap-[8px]">
          <CustomButton isActive={isValid} disabled={!isValid} variant="primary">
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
          onChange={e => setTitle(e.target.value)}
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
      {feedbackMessage && <div className="mt-4 text-red-500">{feedbackMessage}</div>}
    </div>
  );
}

export default AddBoardComponent;
