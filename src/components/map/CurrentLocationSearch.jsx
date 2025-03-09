import React, { useCallback } from "react";
import { MdMyLocation } from "react-icons/md";
import { useDaumPostcodePopup } from "react-daum-postcode";

const CurrentLocationSearch = ({ setAddress }) => {
  const openPostcode = useDaumPostcodePopup();

  const handleCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const geocoder = new window.kakao.maps.services.Geocoder();

          geocoder.coord2RegionCode(lat, lng, function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              const defaultQuery = result[0].formatted_address;
              openPostcode({
                onComplete: handleComplete,
                popupTitle: "붕어빵 가게 주소 찾기",
                defaultQuery,
              });
            }
          });
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: Infinity,
        }
      );
    }
  }, []);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress);
  };

  return (
    <button
      className="flex items-center gap-1 mr-2 text-gray-800 hover:text-black text-sm py-2 px-4 rounded"
      onClick={handleCurrentLocation}
    >
      <MdMyLocation size={14} className="text-gray-600" />
      현위치
    </button>
  );
};

export default CurrentLocationSearch;
