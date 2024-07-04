"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface RedirectButtonProps {
  text: string;
  variant: "primary" | "secondary";
}

function RedirectButton({ text, variant }: RedirectButtonProps) {
  const router = useRouter();
  const { user } = useAuth();

  const handleButtonClick = () => {
    if (user) {
      router.push("/wiki/{code}");
    } else {
      router.push("/login");
    }
  };

  const buttonClass =
    variant === "primary"
      ? "mt-[40px] flex items-center justify-center rounded-[15px] bg-primary-gray-500 px-[30px] py-[15px] text-center text-md-bold-20 leading-[24px] text-white"
      : "h-[54px] w-[169px] rounded-[15px] bg-white text-md-semibold text-primary-gray-500";

  return (
    <button type="button" className={buttonClass} onClick={handleButtonClick}>
      {text}
    </button>
  );
}

export default RedirectButton;
