import React, { forwardRef } from "react";

export interface LabelProps {
  htmlFor?: string;
  label?: string;
  className: string;
}

export interface InputProps extends LabelProps {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
}
const Input = forwardRef<HTMLInputElement, InputProps>(({ id, name, type, placeholder, className, ...props }, ref) => (
  <input id={id} name={name} type={type} placeholder={placeholder} ref={ref} className={className} {...props} />
));

export default Input;

Input.displayName = "Input";
