// import React from "react";
// import Link from "next/link";
// import Rabbit from "@/assets/images/rabbit.webp";
// import Image from "next/image";
import { redirect } from "next/navigation";

function NotFoundCode() {
  redirect("/mypage");

  // return (
  //   <div className="flex min-h-[calc(100dvh-60px)] items-center justify-center px-5 py-5 xl:min-h-[calc(100dvh-80px)]">
  //     <div className="flex flex-col items-center gap-5">
  //       <div className="relative flex h-[180px] w-[110px] flex-col">
  //         <Image src={Rabbit} width={110} height={180} alt="토끼 이미지" className="absolute" />
  //       </div>
  //       <p className="break-keep text-center text-lg font-semibold text-primary-gray-500">
  //         죄송합니다. 요청하신 프로필을 찾을 수 없습니다.
  //       </p>
  //       <Link
  //         href="/mypage"
  //         className="rounded-[10px] bg-primary-green-200 px-5 py-2 text-sm font-semibold leading-[1.7] text-white"
  //       >
  //         마이페이지로
  //       </Link>
  //     </div>
  //   </div>
  // );
}

export default NotFoundCode;
