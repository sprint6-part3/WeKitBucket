import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { urlVaildation } from "@/utils/urlVaildation";
import LinkIcon from "@/assets/icons/link.svg";
import ErrorLottie from "./lottie/error.json";
import { CopyLink } from "../../_constants/toast";
import ToastSelect from "./ToastSelect";

interface CopyLinkButtonProps {
  url: string;
}

const LinkContainer = "inline-flex items-center gap-2 rounded-10 px-3 py-2 sm:h-6.5 cursor-pointer";
const LinkText = "text-md-regular2 sm:text-xs-regular2 text-primary-green-200";

function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url);
    ToastSelect({ type: "check", message: CopyLink });
  };

  if (!urlVaildation(url)) {
    return (
      <button className={`${LinkContainer} bg-secondary-red-100 cursor-not-allowed`} disabled>
        <Lottie animationData={ErrorLottie} style={{ width: "12px", height: "12px" }} />
        <span className={`${LinkText} text-secondary-red-200 truncate`}>경로를 확인해주세요.</span>
      </button>
    );
  }

  return (
    <motion.button
      className={`${LinkContainer} bg-primary-green-100`}
      onClick={handleCopyToClipboard}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
    >
      <div className="inline-flex items-center gap-2">
        <div>
          <LinkIcon />
        </div>
        <span className={`${LinkText} hover:underline`}>{url}</span>
      </div>
    </motion.button>
  );
}

export default CopyLinkButton;
