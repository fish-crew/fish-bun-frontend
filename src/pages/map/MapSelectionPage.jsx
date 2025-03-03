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

  const [map, setMap] = useState(null);
  const [location, setLocation] = useState(null);

  const dispatch = useDispatch();
  const { registerStore } = useSelector((state) => state.map);

  const [debounceLocation, setDebounceLocation] = useState(location);

  const handleLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const handleRegister = () => {
    console.log({ location, address: registerStore.address });
    // address 정보 저장
    dispatch(
      setRegisterStore({
        ...registerStore,
        lat: debounceLocation.lat,
        lng: debounceLocation.lng,
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

          // TODO: 주소 구하는 로직
          // const geocoder = new window.kakao.maps.services.Geocoder();
          // const latlng = new window.kakao.maps.LatLng(
          //   location.getLat(),
          //   location.getLng()
          // );

          // geocoder.coord2RegionCode(
          //   location.getLng(),
          //   location.getLat(),
          //   function (result, status) {
          //     if (status === window.kakao.maps.GeocoderStatus.OK) {
          //       console.log(result[0].formatted_address);
          //     } else {
          //       console.error("지오코더가 실패했습니다. 상태: " + status);
          //     }
          //   }
          // );
        });
      });
    }
  }, [map]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebounceLocation(location);
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
        <p className="text-center text-sz20">{registerStore.address}</p>
        <Button onClick={handleRegister}>등록하기</Button>
      </div>
    </>
  );
};

export default MapSelectionPage;
