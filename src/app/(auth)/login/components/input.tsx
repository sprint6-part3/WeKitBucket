import React from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  validationCheck: boolean;
}

function Input({ id, value, type, placeholder, onChange, validationCheck }: IInputProps) {
  return (
    <input
      id={id}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={`box-border rounded-[10px] border border-primary-gray-100 px-5 py-[9.5px] text-sm leading-[1.7] text-primary-gray-500 outline-0 placeholder:text-[#8F95B2] ${
        validationCheck
          ? "bg-primary-red-100 focus:border-primary-red-100 focus:bg-primary-red-100"
          : "bg-primary-gray-100 focus:border-primary-green-200 focus:bg-white"
      }`}
    />
  );
}

export default Input;
