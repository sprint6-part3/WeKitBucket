"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Button from "../Button";

function BestHeader() {
  const { user } = useAuth();

  return (
    <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-5 sm:px-[60px]">
      <h2 className="text-2xl font-semibold leading-[1.3] text-primary-gray-500">베스트 게시글</h2>
      {user && (
        <Link href="/addboard">
          <Button variants="md">게시물 등록하기</Button>
        </Link>
      )}
    </div>
  );
}

export default BestHeader;
