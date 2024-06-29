import React from "react";

function Label({ htmlFor, children }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label htmlFor={htmlFor} className="text-primary-gray-800 text-sm leading-[1.7]">
      {children}
    </label>
  );
}

export default Label;
