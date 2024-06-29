"use client";

import React, { useEffect, useState } from "react";
import UserProfile from "@/assets/icons/userProfileIcon.svg";
import Link from "next/link";
// import Image from "next/image";

export default function UserProfileDropdown() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const handleLogout = () => {};

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
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
    <div>
      <button onClick={toggleDropdown} aria-label="User Profile">
        {/* <Image src={UserProfile} alt="프로필 이미지" /> */}
        <UserProfile width="32" height="32" />
      </button>

      {isDropdownVisible && (
        <div className="absolute right-[1%] mt-2.5 flex h-[131px] w-[120px] flex-col items-center gap-y-5 rounded-lg bg-white pb-2.5 pt-2.5 shadow-[0px_4px_20px_0px_#00000014]">
          <Link href="/mypage" className="flex items-center text-primary-gray-400">
            계정 설정
          </Link>
          <Link href="/wiki/{code}" className="flex items-center text-primary-gray-400">
            내 위키
          </Link>
          <button onClick={handleLogout} className="flex items-center text-primary-gray-400">
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
