import React from "react";

function Button({ type, children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} {...rest}>
      {children}
    </button>
  );
}

export default Button;
