import React from "react";

function Button({
  type,
  name,
  className = "",
  bgColor = "bg-teal-700",
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={` p-2 bg-[${bgColor}] ${className}`}
      {...props}
    >
      {children ? children : name}
    </button>
  );
}

export default Button;
