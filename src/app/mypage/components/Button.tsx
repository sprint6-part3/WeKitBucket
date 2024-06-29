import React from "react";

function Button({ type, children, disabled }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={`mt-4 w-full max-w-[90px] rounded-[10px] py-[10.5px] text-sm font-semibold leading-[1.7] text-white ${
        disabled ? "bg-primary-gray-200" : "bg-primary-green-200"
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
