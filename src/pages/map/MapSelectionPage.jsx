import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Map from "../../components/map/Map";
import Marker from "../../components/map/Marker";
import Toolbox from "../../components/map/Toolbox";
import Button from "../../components/Button/Button";

import { useSelector, useDispatch } from "react-redux";
import { setRegisterStore } from "../../redux/slices/map";

const MapSelectionPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { registerStore, userLocation } = useSelector((state) => state.map);

  const [map, setMap] = useState(null);
  const [location, setLocation] = useState(
    registerStore.lat && registerStore.lng
      ? { lat: registerStore.lat, lng: registerStore.lng }
      : userLocation
  );
  const [debounceLocation, setDebounceLocation] = useState(location);

  const [address, setAddress] = useState("");

  const handleLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: Infinity }
      );
    }
  }, []);

  const handleRegister = () => {
    // address 정보 저장
    dispatch(
      setRegisterStore({
        ...registerStore,
        lat: debounceLocation.lat,
        lng: debounceLocation.lng,
        address,
      })
    );
    navigate("/map/register");
  };

  useEffect(() => {
    handleLocation();
  }, [handleLocation]);

  useEffect(() => {
    if (map) {
      window.kakao.maps.load(() => {
        window.kakao.maps.event.addListener(map, "center_changed", () => {
          const location = map.getCenter();
          setLocation({ lat: location.getLat(), lng: location.getLng() });
        });
      });
    }
  }, [map]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebounceLocation(location);

      // 좌표로 주소 구하는 로직
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2Address(
        location.lng,
        location.lat,
        function (result, status) {
          if (status === "OK") {
            setAddress(
              result[0].road_address
                ? result[0].road_address.address_name
                : result[0].address.address_name
            );
          } else {
            console.error("지오코더가 실패했습니다. 상태: " + status);
          }
        }
      );
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [location]);

  return (
    <>
      <div className="relative overflow-hidden w-full h-[calc(100vh-120px)]">
        <Map setMap={setMap} location={debounceLocation} />
        {map && <Marker map={map} location={location} markerType="default" />}
        <Toolbox map={map} handleLocation={handleLocation} />
      </div>
      <div className="p-4 bg-white shadow w-full text-center">
        <p className="text-center text-sz20">{address}</p>
        <Button onClick={handleRegister}>등록하기</Button>
      </div>
    </>
  );
};

export default MapSelectionPage;
