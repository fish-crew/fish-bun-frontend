import { useNavigate } from "react-router-dom";

import { FaChevronLeft } from "react-icons/fa6";

function Header({ handleBack }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (typeof handleBack === "function") {
      handleBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex items-center w-full gap-1 border-b border-gray-300 px-4">
      <button onClick={handleGoBack} className="h-[6dvh]">
        <FaChevronLeft size={24} />
      </button>
      <span className="flex w-full justify-center text-black font-bold">
        <img
          className="h-[6dvh] p-2"
          src="/assets/webp/logoBalck.webp"
          alt="붕어빵 탐험대"
        />
      </span>
    </div>
  );
}

export default Header;
