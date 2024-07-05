"use client";

import React, { useState, useEffect, HTMLAttributes } from "react";
import TurndownService from "turndown";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import postArticles from "@/apis/article/postArticles";
import getUsersMe from "@/apis/user/getUsersMe";
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
  const [authorName, setAuthorName] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchAuthorName = async () => {
      try {
        const userData = await getUsersMe();
        if (userData && userData.name) {
          setAuthorName(userData.name);
        } else {
          setAuthorName("Unknown");
        }
      } catch (error) {
        console.error("Failed to fetch author name:", error);
        setAuthorName("Unknown");
      }
    };

    fetchAuthorName();
    setCurrentDate(`${dayjs().format("YYYY.MM.DD")}.`);
  }, []);

  const handleSubmit = async () => {
    try {
      const turndownService = new TurndownService();
      const markdownContent = turndownService.turndown(content);
      const articleInput: ArticleInput = {
        title,
        content: markdownContent,
        image: imageUrl,
      };

      console.log("Sending data:", articleInput);

      const response = await postArticles(articleInput);
      const articleId = response.id;

      router.push(`/boards/${articleId}`);

      setTitle("");
      setContent("");
      setImageUrl("");
      setContentLength({ withSpaces: 0, withoutSpaces: 0 });
    } catch (error) {
      console.error("게시물 등록 실패:", error);
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
      <div className="flex items-center justify-between md:mb-[25px]">
        <h2 className="sm-bold text-gray-500 md:text-md-semibold xl:text-lg-semibold">게시물 등록하기</h2>
        <div className="flex gap-[8px]">
          <CustomButton isActive={isValid} disabled={!isValid} onClick={handleSubmit} variant="secondary">
            등록하기
          </CustomButton>
        </div>
      </div>
      <span className="mt-[23px] text-sm-regular-12 text-gray-400 md:text-sm-regular">
        {authorName} {currentDate}
      </span>
      <div className="mt-[18px] flex w-full items-center justify-between gap-2 border-y border-b border-gray-200 py-3 text-sm-regular md:mt-[25px]">
        <input
          onChange={e => setTitle(e.target.value)}
          value={title}
          className="md:text-xl-medium flex flex-1 items-center justify-between gap-2 text-gray-600 md:text-md-medium"
          placeholder="제목을 입력해주세요"
          maxLength={TITLE_MAX_LEN}
        />
        <span className="text-sm-regular text-gray-500 md:text-md-medium">
          {title.length}/<span className="text-green-500">{TITLE_MAX_LEN}</span>
        </span>
      </div>
      <p className="mt-4 text-sm-regular-14 text-gray-700 md:text-sm-regular">
        공백포함 : 총<span className="text-gray-500"> {contentLength.withSpaces}</span>자 | 공백제외: 총
        <span className="text-gray-500"> {contentLength.withoutSpaces}</span>자
      </p>
      <div className="relative">
        <div className="w-full">
          <QuillEditor setContent={handleSearchItem} content={content} setImageUrl={setImageUrl} />
        </div>
      </div>
    </div>
  );
}

export default AddBoardComponent;
