"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";

import postSignOut from "@/apis/auth/postSignout";
import { useAuth } from "@/context/AuthContext";

import HamburgerMenu from "@/assets/icons/hamburgerMenu.svg";
import ModalComponent from "./ModalComponent";
import MenuModalHeader from "./MenuModalHeader";
import AlarmModal from "./AlarmModal";

export default function UserDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const { getUser } = useAuth();
  const router = useRouter();

  const segment = useSelectedLayoutSegment();

  const onAlarmOpen = () => {
    setIsAlarmOpen(true);
  };

  const onAlarmClose = () => {
    setIsAlarmOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const onClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "scroll";
  };

  const handleLogout = async () => {
    try {
      await postSignOut(); // 쿠키 삭제
      await getUser();
    } catch (error) {
      console.error(error);
    } finally {
      if (isOpen) onClose();
      router.push("/");
    }
  };

  return (
    <div>
      <button onClick={onOpen} aria-label="User Profile">
        {/* <Image src={UserProfile} alt="프로필 이미지" /> */}
        <HamburgerMenu width="32" height="32" />
      </button>

      {isOpen && (
        <ModalComponent>
          <MenuModalHeader onClose={onClose} />
          <div className="mt-2.5 flex flex-col items-center gap-y-10 rounded-lg bg-white pb-2.5 pt-2.5">
            {segment === "wikilist" ? (
              <Link onClick={onClose} href="/wikilist" className="flex items-center text-primary-green-200">
                위키목록
              </Link>
            ) : (
              <Link onClick={onClose} href="/wikilist" className="flex items-center text-primary-gray-400">
                위키목록
              </Link>
            )}
            {segment === "boards" ? (
              <Link onClick={onClose} className="flex items-center text-primary-green-200" href="/boards">
                자유게시판
              </Link>
            ) : (
              <Link onClick={onClose} className="flex items-center text-primary-gray-400" href="/boards">
                자유게시판
              </Link>
            )}
            <hr className="h-[1px] w-[95dvw] px-[3px]" />
            <button onClick={onAlarmOpen} className="flex items-center text-primary-gray-400">
              알람
            </button>
            <Link onClick={onClose} href="/mypage" className="flex items-center text-primary-gray-400">
              마이페이지
            </Link>
            <button onClick={handleLogout} className="flex items-center text-primary-gray-400">
              로그아웃
            </button>
          </div>
        </ModalComponent>
      )}
      {isAlarmOpen && <AlarmModal onClose={onAlarmClose} />}
    </div>
  );
}
