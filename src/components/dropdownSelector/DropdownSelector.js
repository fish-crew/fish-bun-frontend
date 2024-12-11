import React, { useState, useEffect, useRef } from "react";

function DropdownSelector({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null); // 드롭다운 컴포넌트 참조

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option); // 부모 컴포넌트로 선택 값 전달
    setIsOpen(false); // 선택 후 드롭다운 닫기
  };

  // 화면 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-72 mt-4">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full rounded-full p-1 text-sz30 bg-[#630000] text-left"
      >
        <div className="flex items-center rounded-full justify-between text-white">
          <span className="w-full text-center">붕어빵 선택</span>
          <span
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            ▼
          </span>
        </div>
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full border rounded bg-white max-h-52 overflow-y-auto shadow">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="p-2 hover:bg-gray-200 cursor-pointer text-sz25 border-b last:border-b-0 text-left"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownSelector;
