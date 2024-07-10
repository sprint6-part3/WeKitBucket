"use client";

import { useToast } from "@/context/ToastContext";
import React from "react";
import ToastPopup from "./ToastPopup";

export default function Toast() {
  const { toast } = useToast();

  return (
    <div className="fixed">
      {toast.active && (
        <ToastPopup message={toast.message} position={toast.pos} color={toast.color} width={toast.width} />
      )}
    </div>
  );
}
