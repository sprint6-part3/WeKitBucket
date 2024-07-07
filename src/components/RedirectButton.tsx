"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface RedirectButtonProps {
  text: string;
  variant: "primary" | "secondary";
}

function RedirectButton({ text, variant }: RedirectButtonProps) {
  const { user, userProfile } = useAuth();

  const userProfileCheck = `${userProfile ? `/wiki/${userProfile.code}` : "/makewiki"}`;

  const buttonClass =
    variant === "primary"
      ? "mt-[40px] flex items-center justify-center rounded-[15px] bg-primary-gray-500 px-[30px] py-[15px] text-center text-md-bold-20 leading-[24px] text-white"
      : // : "h-[54px] w-[169px] rounded-[15px] bg-white text-md-semibold text-primary-gray-500";
        "flex items-center justify-center h-[54px] w-[169px] rounded-[15px] bg-white text-md-semibold text-primary-gray-500";

  return (
    <Link href={user ? userProfileCheck : "/login"} className={buttonClass}>
      {text}
    </Link>
  );
}

export default RedirectButton;
