"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface ToastProps {
  active: boolean;
  color: "red" | "green" | "gray";
  pos: "top" | "bottom";
  message: string;
}

interface ToastContextType {
  toast: ToastProps;
  popupToast: ({
    color,
    pos,
    message,
  }: {
    color: "red" | "green" | "gray";
    pos: "top" | "bottom";
    message: string;
  }) => void;
}

const ToastContext = createContext<ToastContextType>({
  toast: { active: false, color: "red", pos: "top", message: "" },
  popupToast: () => {},
});

function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastProps>({ active: false, color: "red", pos: "top", message: "" });

  const popupToast = async ({
    color,
    pos,
    message,
  }: {
    color: "red" | "green" | "gray";
    pos: "top" | "bottom";
    message: string;
  }) => {
    setToast({ active: true, color, pos, message });

    setTimeout(() => {
      setToast({ active: false, color, pos, message });
    }, 3500);
  };

  const values = useMemo(
    () => ({ toast, popupToast }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toast],
  );

  return <ToastContext.Provider value={values}>{children}</ToastContext.Provider>;
}

function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast는 ToastProvider 안에서 쓰세요");
  }
  return context;
}

export { ToastProvider, useToast };
