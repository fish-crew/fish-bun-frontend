import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Map from "../../components/map/Map";
import Marker from "../../components/map/Marker";
import Markers from "../../components/map/Markers";
import Toolbox from "../../components/map/Toolbox";
import SelectedStore from "../../components/map/SelectedStore";

import { fetchStoreInfo } from "../../api/map";

import { useDispatch, useSelector } from "react-redux";
import {
  setStores,
  setSelectedStore,
  setUserLocation,
  setRegisterStore,
  INITIAL_STORE,
} from "../../redux/slices/map";

const MapPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { stores, selectedStore, userLocation } = useSelector(
    (state) => state.map
  );

  const [map, setMap] = useState(null);

  // 지도 최초 렌더링을 위한 조건
  const [mapLoaded, setMapLoaded] = useState(false);

  const [selectedMarker, setSelectedMarker] = useState(selectedStore);
  const handleSelectedMarker = (store) => {
    if (selectedMarker?.id === store.id) {
      setSelectedMarker(null);
      dispatch(setSelectedStore(null));
    } else {
      setSelectedMarker(store);
      dispatch(setSelectedStore(store));
    }
  };

  // 사용자 위치
  const [location, setLocation] = useState(null);

  const handleLocation = useCallback(
    (withCenter = true) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            dispatch(
              setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              })
            );
            if (withCenter) {
              setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            }
          },
          (error) => {
            console.error(error);
            if (error.code === 1) {
              alert(
                "위치 정보를 가져오는 데 실패했습니다. 위치 공유를 허용해주세요."
              );
            }
          }
        );
      }
    },
    [dispatch]
  );

  const handleRegister = () => {
    dispatch(setRegisterStore(INITIAL_STORE));
    navigate("/map/register");
  };

  useEffect(() => {
    if (map && location) {
      map.setCenter(new window.kakao.maps.LatLng(location.lat, location.lng));
    }
  }, [map, location]);

  useEffect(() => {
    if (mapLoaded) return;

    // bounds가 변경될 때마다 가게 정보를 다시 호출하는 로직
    const handleMapIdle = () => {
      if (map) {
        const bounds = map.getBounds();
        fetchStoreInfo({
          maxLat: bounds.pa,
          maxLng: bounds.oa,
          minLat: bounds.qa,
          minLng: bounds.ha,
        }).then((res) => {
          dispatch(setStores(res.data));
        });
      }
    };

    if (map) {
      // 가게 상세정보 페이지에서 온 경우
      if (selectedStore) {
        setLocation({
          lat: selectedStore.lat,
          lng: selectedStore.lng,
        });
      }

      // 사용자 위치 설정
      // 가게 상세정보 페이지에서 온 경우 중심 이동 제외
      handleLocation(!selectedStore);

      // bounds가 변경될 때마다 가게 정보를 다시 호출하는 로직
      map.addListener("idle", handleMapIdle);

      // 지도 최초 렌더링 완료
      setMapLoaded(true);
    }

    return () => {
      if (map) {
        map.removeListener("idle", handleMapIdle);
      }
    };
  }, [map, mapLoaded, handleLocation, selectedStore, dispatch]);

  return (
    <div className="relative overflow-hidden w-full h-[calc(100vh-120px)]">
      <Map setMap={setMap} location={location} />
      {location && (
        <Marker map={map} location={userLocation} markerType="user" />
      )}
      <Markers
        map={map}
        stores={stores}
        handleSelectedMarker={handleSelectedMarker}
      />
      <Toolbox
        map={map}
        handleLocation={handleLocation}
        handleRegister={handleRegister}
      />
      {selectedMarker && (
        <SelectedStore store={selectedMarker} location={userLocation} />
      )}
    </div>
  );
};

export default MapPage;
