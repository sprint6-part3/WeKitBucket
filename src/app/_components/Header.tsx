"use client";

import Link from "next/link";

import debounce from "@/utils/debounce";
// import { IUser } from "@/types/user";
import { useEffect, useState } from "react";
import getUsersMe from "@/apis/user/getUsersMe";

import WikidLogo from "@/assets/icons/wikidLogo.svg";
import MessageAlarm from "./_Header/MessageAlarm";
import UserDropDown from "./_Header/UserDropDown";
import NotUserDropDown from "./_Header/NotUserDropDown";
import UserProfileDropdown from "./_Header/UserProfileDropdown";

function Header() {
  // const segment = useSelectedLayoutSegment();
  // const [user, setUser] = useState<IUser | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const user = {
    profile: {
      code: "string",
      id: 1,
    },
    updatedAt: "2024-06-26T17:35:13.682Z",
    createdAt: "2024-06-26T17:35:13.682Z",
    teamId: "string",
    name: "이름",
    id: 1,
  };

  // const user = null;

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
    const data = getUsersMe();
    if (data) {
      console.log(data);
    }
  }, []);

  return (
    <div
      style={{ zIndex: 3 }}
      className="sticky top-0 flex justify-between gap-x-[40px] bg-white px-[20px] py-[15px] shadow-[0px_4px_20px_-24px_black] md:px-[20px] md:py-[15px] xl:px-[80px] xl:py-[25px]"
    >
      <div className="flex items-center gap-x-5">
        <Link href="/" className="">
          <WikidLogo width="107px" height="30px" />
        </Link>

        {/* <button onClick={dummyData}>
          <WikidLogo width="107px" height="30px" />
        </button> */}
        {windowWidth > 450 && (
          <div className="flex-shrink-1 flex items-center gap-x-5">
            <Link href="/wikilist" className="w-[60px] text-sm font-normal leading-6 text-primary-gray-500">
              위키목록
            </Link>
            <Link href="/boards" className="w-[70px] text-sm font-normal leading-6 text-primary-gray-500">
              자유게시판
            </Link>
          </div>
        )}
      </div>
      {user ? (
        <div className="z-3">
          {windowWidth > 450 ? (
            <div className="flex items-center gap-x-5 text-primary-gray-400">
              <MessageAlarm />
              <UserProfileDropdown />
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

export default Header;
