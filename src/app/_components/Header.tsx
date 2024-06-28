"use client";

import { useEffect, useState } from "react";
// import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import WikidLogo from "@/assets/icons/wikidLogo.svg";
import MessageAlarm from "./_Header/MessageAlarm";
import UserDropDown from "./_Header/UserDropDown";
import NotUserDropDown from "./_Header/NotUserDropDown";
import UserProfileDropdown from "./_Header/UserProfileDropdown";

function Header() {
  // const segment = useSelectedLayoutSegment();
  const [windowWidth, setWindowWidth] = useState(0);

  /** 더미 데이터 시작 */

  // const INITIAL_DATA = {
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

  // const [user, setUser] = useState<null>(INITIAL_DATA);

  // const dummyData = () => {
  //   if (user) setUser(null);
  //   else setUser(INITIAL_DATA);
  // };

  /** 더미 데이터 끝 */

  // const user = null;

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
    <div className="flex justify-between gap-x-40 px-[20px] py-[15px] md:px-[20px] md:py-[15px] xl:px-[80px] xl:py-[25px]">
      <div className="flex items-center gap-x-5">
        <Link href="/" className="">
          <WikidLogo width="107px" height="30px" />
        </Link>

        {/* <button onClick={dummyData}>
          <WikidLogo width="107px" height="30px" />
        </button> */}
        {windowWidth > 375 && (
          <div className="flex items-center gap-x-5">
            <Link href="/wikilist" className="w-[50px] text-sm font-normal leading-6 text-primary-gray-500">
              위키목록
            </Link>
            <Link href="/boards" className="w-[70px] text-sm font-normal leading-6 text-primary-gray-500 md:text-xs">
              자유게시판
            </Link>
          </div>
        )}
      </div>
      {user ? (
        <div>
          {windowWidth > 375 ? (
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
          {windowWidth > 375 ? (
            <Link href="/login" className="w-[40px] text-sm font-normal leading-6">
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
