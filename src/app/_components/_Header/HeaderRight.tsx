"use client";

import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import debounce from "@/utils/debounce";

import { useAuth } from "@/context/AuthContext";
import MessageAlarm from "./MessageAlarm";
import UserDropDown from "./UserDropDown";
import NotUserDropDown from "./NotUserDropDown";
import UserProfileDropdown from "./UserProfileDropdown";

// const user = {
//   profile: {
//     code: "string",
//     id: 1,
//   },
//   updatedAt: "2024-06-26T17:35:13.682Z",
//   createdAt: "2024-06-26T17:35:13.682Z",
//   teamId: "string",
//   name: "이름",
//   id: 1,
// };

export default function HeaderRight() {
  const { user, getUser } = useAuth();
  // const router = useRouter();

  const [windowWidth, setWindowWidth] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean[]>([false, false]);

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

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {user ? (
        <div className="z-3">
          {windowWidth > 450 ? (
            <div className="flex items-center gap-x-5 text-primary-gray-400">
              <MessageAlarm toggle={isDropdownVisible[0]} setToggle={setIsDropdownVisible} />
              <UserProfileDropdown
                toggle={isDropdownVisible[1]}
                setToggle={setIsDropdownVisible}
                code={user.profile?.code}
              />
            </div>
          ) : (
            <UserDropDown />
          )}
        </div>
      ) : (
        <div className="flex items-center">
          {windowWidth > 450 ? (
            <Link href="/login" className="w-[50px] text-sm font-normal leading-6">
              로그인
            </Link>
          ) : (
            <NotUserDropDown />
          )}
        </div>
      )}
    </div>
  );
}
