import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  Map,
  Marker,
  Markers,
  Toolbox,
  SelectedStore,
} from "../../components/map";
import Header from "../../components/header/Header";
import AlertModal, { showAlert } from "../../components/modals/AlertModal";

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
  const { selectedStore, userLocation } = useSelector((state) => state.map);

  const [map, setMap] = useState(null);

  const handleSelectedStore = (store) => {
    if (selectedStore?.id === store.id) {
      dispatch(setSelectedStore(null));
    } else {
      dispatch(setSelectedStore(store));
    }
  };

  // 지도 중심 위치
  const [location, setLocation] = useState(null);

  const handleUserLocation = useCallback(
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
              showAlert(
                "위치 정보를 가져오는 데 실패했습니다. 위치 공유를 허용해주세요."
              );
            } else if (error.code === 2) {
              showAlert(
                "위치 업데이트를 사용할 수 없습니다. 나중에 다시 시도해주세요."
              );
            }
          },
          { enableHighAccuracy: false, timeout: 5000, maximumAge: Infinity }
        );
      }
    },
    [dispatch]
  );

  const handleLocation = () => {
    handleUserLocation();
    dispatch(setSelectedStore(null));
  };

  const handleRegister = () => {
    dispatch(setRegisterStore(INITIAL_STORE));
    navigate("/map/register");
  };

  const handleBack = () => {
    navigate("/");
  };

  // bounds가 변경될 때마다 가게 정보를 다시 호출하는 로직
  const handleStoreInfo = useCallback(() => {
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
  }, [map, dispatch]);

  useEffect(() => {
    if (map && location) {
      map.panTo(new window.kakao.maps.LatLng(location.lat, location.lng));
    }
  }, [map, location]);

  useEffect(() => {
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
      handleUserLocation(!selectedStore);

      handleStoreInfo();
      // bounds가 변경될 때마다 가게 정보를 다시 호출하는 로직
      map.addListener("idle", handleStoreInfo);
    }

    return () => {
      if (map) {
        map.removeListener("idle", handleStoreInfo);
      }
    };
  }, [map, handleUserLocation, handleStoreInfo, dispatch]);

  return (
    <>
      <Header handleBack={handleBack} />
      <div className="relative overflow-hidden w-full h-[calc(100vh-120px)] main-area">
        <AlertModal />
        <Map setMap={setMap} location={location} />
        {userLocation && (
          <Marker map={map} location={userLocation} markerType="user" />
        )}
        <Markers map={map} handleSelectedMarker={handleSelectedStore} />
        <Toolbox
          map={map}
          handleLocation={handleLocation}
          handleRegister={handleRegister}
        />
        {selectedStore && (
          <SelectedStore storeId={selectedStore.id} refetch={handleStoreInfo} />
        )}
      </div>
    </>
  );
};

export default MapPage;
