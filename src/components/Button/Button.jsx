import React from "react";

const Button = ({ onClick, className, children }) => {
  return (
    <button
      className={`
    mt-4 bg-[#1069b0] hover:bg-white hover:text-[#1069b0] text-white 
    border-4 py-2 px-6 rounded-full text-sz25 tracking-[.25em] flex items-center gap-2 justify-center w-full ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
