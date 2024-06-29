import React from "react";

const handleClick = () => {
  // alert("가입이 완료되었습니다");
  console.log("가입이 완료되었습니다");
};

function Button({ type, children, disabled }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={`mt-8 w-full max-w-[400px] rounded-[10px] py-[10.5px] text-sm font-semibold leading-[1.7] text-white ${
        disabled ? "bg-primary-gray-200" : "bg-primary-green-200"
      }`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
