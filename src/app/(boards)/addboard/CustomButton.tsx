import React from "react";

type CustomButtonProps = {
  isActive: boolean;
  variant: "primary" | "secondary";
  children: React.ReactNode;
  [key: string]: unknown;
};

function CustomButton({ isActive, variant, children, ...props }: CustomButtonProps) {
  const baseClass = "rounded-[10px] w-[74px] h-[40px] px-[11px] py-[8px] text-sm-regular-14 md:w-[140px] h-[45px]";

  const getVariantClass = () => {
    if (isActive) {
      return variant === "primary" ? "border border-green-500 bg-white text-green-500" : "bg-green-500 text-white";
    }
    return variant === "primary" ? "text-gray-600 border border-gray-300" : "bg-gray-300 text-white";
  };

  const stateClass = getVariantClass();

  return (
    <button className={`${baseClass} ${stateClass}`} {...props}>
      {children}
    </button>
  );
}

export default CustomButton;
