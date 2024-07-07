"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import debounce from "@/utils/debounce";

import Logo from "@/assets/icons/logo.svg";
import { useSelectedLayoutSegment } from "next/navigation";

export default function HeaderLeft() {
  const segment = useSelectedLayoutSegment();
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const debouncedHandleResize = debounce(handleResize, 100);

    if (windowWidth === 0) setWindowWidth(window.innerWidth);
    window.addEventListener("resize", debouncedHandleResize);
    window.addEventListener("beforeunload", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      window.removeEventListener("beforeunload", debouncedHandleResize);
    };
  }, [windowWidth]);

  return (
    <div className="flex items-center gap-x-5">
      <Link href="/" className="">
        <Logo className="aspect-[171/30] w-[130px]" width="auto" height="auto" />
      </Link>

      {/* <button onClick={dummyData}>
          <WikidLogo width="107px" height="30px" />
        </button> */}
      {windowWidth > 450 && (
        <div className="flex-shrink-1 flex items-center gap-x-5">
          {segment === "wikilist" ? (
            <Link href="/wikilist" className="text-sm font-normal leading-6 text-primary-green-200">
              위키목록
            </Link>
          ) : (
            <Link href="/wikilist" className="text-sm font-normal leading-6 text-primary-gray-500">
              위키목록
            </Link>
          )}
          {segment === "boards" ? (
            <Link href="/boards" className="text-sm font-normal leading-6 text-primary-green-200">
              자유게시판
            </Link>
          ) : (
            <Link href="/boards" className="text-sm font-normal leading-6 text-primary-gray-500">
              자유게시판
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
