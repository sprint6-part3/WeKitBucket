import React from "react";

function Label({ htmlFor, className, children }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
}

export default Label;
