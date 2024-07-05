/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable default-case */
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import InfoIcon from "@/assets/icons/info.svg";
import { ToastProps, toastOptions } from "@/types/toast";
import CheckLottie from "./lottie/check.json";
import ErrorLottie from "./lottie/error.json";
import { CopyLink, Uneditable, Notification } from "../../_constants/toast";

function ToastSelect({ type, message, onClose, autoClose = toastOptions.autoClose }: ToastProps) {
  const defaultMessages = {
    check: CopyLink,
    error: Uneditable,
    notification: Notification,
  };

  const finalMessage = message || defaultMessages[type];

  switch (type) {
    case "check":
      toast.success(finalMessage, {
        ...toastOptions,
        autoClose,
        icon: <Lottie animationData={CheckLottie} />,
        onClose,
      });
      break;
    case "error":
      toast.error(finalMessage, {
        ...toastOptions,
        autoClose,
        icon: <Lottie animationData={ErrorLottie} />,
        onClose,
      });
      break;
    case "notification":
      toast.info(finalMessage, {
        ...toastOptions,
        autoClose,
        icon: <InfoIcon />,
        onClose,
      });
      break;
  }

  return <></>;
}

export default ToastSelect;
