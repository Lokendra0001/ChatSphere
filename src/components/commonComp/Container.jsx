import React from "react";

export default function Container({ children, className = "", style }) {
  return (
    <div className={`max-w-[1400px] mx-auto  ${className}`} style={style}>
      {children}
    </div>
  );
}
