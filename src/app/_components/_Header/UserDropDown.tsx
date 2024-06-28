"use client";

import React, { useState } from "react";
import HamburgerMenu from "@/assets/icons/hamburgerMenu.svg";
import Link from "next/link";
// import Image from "next/image";

export default function UserDropDown() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleLogout = () => {};

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div>
      <button onClick={toggleDropdown} aria-label="User Profile">
        {/* <Image src={UserProfile} alt="프로필 이미지" /> */}
        <HamburgerMenu width="32" height="32" />
      </button>

      {isDropdownVisible && (
        <div className="absolute right-[1%] z-[999] mt-2.5 flex h-[176px] w-[120px] flex-col items-center gap-y-5 rounded-lg pb-2.5 pt-2.5 shadow-[0px_4px_20px_0px_#00000014]">
          <Link href="/wikilist" className="flex items-center text-primary-gray-400">
            위키목록
          </Link>
          <Link href="/boards" className="flex items-center text-primary-gray-400">
            자유게시판
          </Link>
          <button onClick={handleLogout} className="flex items-center text-primary-gray-400">
            알림
          </button>
          <Link href="/mypage" className="flex items-center text-primary-gray-400">
            마이페이지
          </Link>
        </div>
      )}
    </div>
  );
}
