"use client";

import React, { PropsWithChildren } from "react";

interface IButtonProps extends PropsWithChildren {
  small?: boolean;
}

function Button({ small, children }: IButtonProps) {
  return (
    <button
      className={`rounded-[10px] bg-primary-green-200 py-[10.5px] text-sm font-semibold leading-[1.7] text-white ${small ? "px-[20.5px] md:px-[35.5px]" : "px-[27.5px]"}`}
    >
      {children}
    </button>
  );
}

export default Button;
