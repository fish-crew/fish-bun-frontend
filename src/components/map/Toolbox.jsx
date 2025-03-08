import React from "react";
import { MdMyLocation } from "react-icons/md";
import { DEFAULT_ZOOM } from "../../redux/slices/map";

const Toolbox = ({ map, handleLocation, handleRegister }) => {
  const handleCurrentLocation = () => {
    handleLocation();
    if (map) {
      map.setLevel(DEFAULT_ZOOM);
    }
  };

  return (
    <>
      {handleRegister && (
        <button
          className="absolute top-[10px] right-[10px] z-10 bg-white shadow-md rounded-full p-1"
          onClick={handleRegister}
        >
          <img
            src={"/assets/webp/goToRegisterBtn_blue.webp"}
            alt="등록하기"
            width={20}
            height={20}
          />
        </button>
      )}
      {handleLocation && (
        <button
          className="absolute bottom-[10px] right-[10px] z-10 bg-white shadow-md rounded-full p-1"
          onClick={handleCurrentLocation}
        >
          <MdMyLocation size={20} color="#1069b0" />
        </button>
      )}
    </>
  );
};

export default Toolbox;
