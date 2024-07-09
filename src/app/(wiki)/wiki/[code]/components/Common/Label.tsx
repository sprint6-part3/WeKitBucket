import React from "react";

function Label({ htmlFor, children, ...rest }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label htmlFor={htmlFor} {...rest}>
      {children}
    </label>
  );
}

export default Label;
