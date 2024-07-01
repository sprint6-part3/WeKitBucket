"use client";

import React, { PropsWithChildren } from "react";

interface IButtonProps extends PropsWithChildren {
  variants?: "sm" | "md" | "lg";
}

function Button({ variants, children }: IButtonProps) {
  let sizeClass;
  switch (variants) {
    case "sm":
      sizeClass = "px-[27.5px]";
      break;
    case "md":
      sizeClass = "px-[20.5px] md:px-[35.5px]";
      break;
    case "lg":
      break;
    default:
      break;
  }

  return (
    <button
      className={`rounded-[10px] bg-primary-green-200 py-[10.5px] text-sm font-semibold leading-[1.7] text-white ${sizeClass}`}
    >
      {children}
    </button>
  );
}

export default Button;
