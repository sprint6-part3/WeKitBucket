"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";

import UserProfile from "@/assets/icons/userProfileIcon.svg";
import postSignOut from "@/apis/auth/postSignout";
import { useAuth } from "@/context/AuthContext";

export default function UserProfileDropdown({
  toggle,
  setToggle,
  code,
  profileImage,
}: {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean[]>>;
  code: string;
  profileImage?: string | null;
}) {
  const [windowWidth, setWindowWidth] = useState(0);
  const segments = useSelectedLayoutSegments();
  const { getUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await postSignOut();
    await getUser();
    router.push("/");
  };

  const toggleDropdown = () => {
    setToggle([false, !toggle]);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (windowWidth === 0) setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    window.addEventListener("beforeunload", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("beforeunload", handleResize);
    };
  }, [windowWidth]);

  return (
    <div className="flex">
      <button onClick={toggleDropdown} aria-label="User Profile">
        {/* <Image src={UserProfile} alt="프로필 이미지" /> */}
        {profileImage ? (
          <div className="relative aspect-[1/1] h-[32px] w-[32px] border-none">
            <Image fill src={profileImage} alt="프로필 이미지" className="rounded-full" />
          </div>
        ) : (
          <UserProfile width="32" height="32" />
        )}
      </button>

      {toggle && (
        <div className="absolute right-[1%] top-[70%] mt-2.5 flex h-[131px] w-[120px] flex-col items-center gap-y-5 rounded-lg bg-white pb-2.5 pt-2.5 shadow-[0px_4px_20px_0px_#00000014]">
          {segments.includes("mypage") ? (
            <Link href="/mypage" className="flex items-center text-primary-green-200">
              계정 설정
            </Link>
          ) : (
            <Link href="/mypage" className="flex items-center text-primary-gray-400">
              계정 설정
            </Link>
          )}
          {segments.includes("wiki") ? (
            <Link href={`/wiki/${code}`} className="flex items-center text-primary-green-200">
              내 위키
            </Link>
          ) : (
            <Link href={`/wiki/${code}`} className="flex items-center text-primary-gray-400">
              내 위키
            </Link>
          )}
          <button onClick={handleLogout} className="flex items-center text-primary-gray-400">
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
