"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface ToastProps {
  active: boolean;
  mid_act: boolean;
  color: "red" | "green" | "gray";
  pos: "top" | "bottom";
  message: string;
  width: number;
}

interface ToastContextType {
  toast: ToastProps;
  popupToast: ({
    color,
    pos,
    message,
    width,
  }: {
    color: "red" | "green" | "gray";
    pos: "top" | "bottom";
    message: string;
    width: number;
  }) => void;
  popupMidToast: ({
    color,
    pos,
    message,
    width,
  }: {
    color: "red" | "green" | "gray";
    pos: "top" | "bottom";
    message: string;
    width: number;
  }) => void;
}

const ToastContext = createContext<ToastContextType>({
  toast: { active: false, mid_act: false, color: "red", pos: "top", message: "", width: 0 },
  popupToast: () => {},
  popupMidToast: () => {},
});

function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastProps>({
    active: false,
    mid_act: false,
    color: "red",
    pos: "top",
    message: "",
    width: 0,
  });

  const popupToast = async ({
    color,
    pos,
    message,
    width,
  }: {
    color: "red" | "green" | "gray";
    pos: "top" | "bottom";
    message: string;
    width: number;
  }) => {
    setToast({ active: true, mid_act: false, color, pos, message, width });

    setTimeout(() => {
      setToast({ active: false, mid_act: false, color, pos, message, width });
    }, 3500);
  };

  const popupMidToast = async ({
    color,
    pos,
    message,
    width,
  }: {
    color: "red" | "green" | "gray";
    pos: "top" | "bottom";
    message: string;
    width: number;
  }) => {
    setToast({ active: false, mid_act: true, color, pos, message, width });

    setTimeout(() => {
      setToast({ active: false, mid_act: false, color, pos, message, width });
    }, 3500);
  };

  const values = useMemo(
    () => ({ toast, popupToast, popupMidToast }),
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
