import React from "react";

const CloseButton = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center bg-[#1069b0] hover:bg-gray-300 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 text-white stroke-[3px]"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};

export default CloseButton;
