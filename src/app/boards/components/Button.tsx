import React, { PropsWithChildren } from "react";

interface IButtonProps extends PropsWithChildren {
  px?: number;
}

function Button({ px, children }: IButtonProps) {
  const paddingX = px ? `px-[${px}px]` : "";
  return (
    <button
      className={`${paddingX} rounded-[10px] bg-primary-green-200 py-[10.5px] text-sm font-semibold leading-[1.7] text-white`}
    >
      {children}
    </button>
  );
}

export default Button;
