import React from "react";
import { MdMyLocation } from "react-icons/md";

const CurrentLocationSearch = ({ handleAddress }) => {
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          getAddressWithGeocoder({ lat, lng });
        },
        (error) => {
          console.error(error);
          if (error.code === 1) {
            alert(
              "위치 정보를 가져오는 데 실패했습니다. 위치 공유를 허용해주세요."
            );
          } else if (error.code === 2) {
            alert(
              "위치 업데이트를 사용할 수 없습니다. 나중에 다시 시도해주세요."
            );
          }
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: Infinity,
        }
      );
    }
  };

  const getAddressWithGeocoder = ({ lat, lng }) => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2Address(lng, lat, function (result, status) {
        if (status === "OK") {
          const defaultQuery = result[0].road_address
            ? result[0].road_address.address_name
            : result[0].address.address_name;

          if (handleAddress) {
            handleAddress(defaultQuery);
          }
        } else {
          console.error({ result, status });
        }
      });
    });
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
